// src/services/geminiService.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
// ^ Baris di atas penting biar dia gak rewel soal tipe 'any'

import { GoogleGenAI, Modality } from "@google/genai";

// Ambil API Key dengan aman (Fallback ke string kosong biar TS gak marah)
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

if (!API_KEY) {
  console.error("⚠️ API Key Gemini belum diset di .env.local!");
}

// --- HELPER FUNCTIONS ---

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const pollVideoOperation = async (operation: any) => {
    let currentOperation = operation;
    while (!currentOperation.done) {
        // Tunggu 5 detik (dipercepat dikit dari 10)
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Re-init client inside loop is fine for polling
        const localAi = new GoogleGenAI({ apiKey: API_KEY });
        currentOperation = await localAi.operations.getVideosOperation({ operation: currentOperation });
    }
    return currentOperation;
};

// --- GEMINI API CLIENT INITIALIZATION ---
const ai = new GoogleGenAI({ apiKey: API_KEY });

// --- FEATURE: Flyer Generation ---
export const generateFlyer = async (image: File, description: string) => {
  const model = 'gemini-2.5-flash-image';
  const imagePart = await fileToGenerativePart(image);
  
  const prompt = `You are an expert AI e-commerce photographer and editor.
    Your task is to take a user-provided product image and a description, and create a hyper-realistic, professional e-commerce photo (9:16 portrait aspect ratio) suitable for Indonesian UMKM.
    ANALYSIS FIRST: Read the "${description}" to determine the product category, then choose ONE path below.
    PATH A: FOR WEARABLE/USABLE PRODUCTS (Clothing, Shoes, Bags, etc.)
    1. Generate a Scene: User/model/hands using product naturally.
    2. Match Theme from "${description}".
    PATH B: FOR STANDALONE PRODUCTS (Food, Drinks, Canned Goods, etc.)
    1. Preserve Subject. Remove Background.
    2. Special Rule: Food/Drink -> Add steam/condensation if needed.
    UNIVERSAL RULES:
    1. New Background: Hyper-realistic, professional lighting.
    2. Tone: Bright and fresh.
    3. No Text/Watermarks.`;

  const textPart = { text: prompt };
  
  const captionPrompt = `Buatkan 1 alternatif caption sosial media yang menarik dan 5 hashtag relevan untuk produk dengan deskripsi: "${description}". Format dalam Bahasa Indonesia.`;

  const [imageResponse, captionResponse] = await Promise.all([
    ai.models.generateContent({
      model,
      contents: { parts: [imagePart, textPart] },
      config: { responseModalities: [Modality.IMAGE] },
    }),
    ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: captionPrompt,
    })
  ]);

  const imagePartFromResponse = imageResponse.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
  if (!imagePartFromResponse?.inlineData) throw new Error("Gagal menghasilkan gambar. Coba lagi.");
  
  const base64ImageBytes: string = imagePartFromResponse.inlineData.data || "";
  const imageUrl = `data:${imagePartFromResponse.inlineData.mimeType};base64,${base64ImageBytes}`;
  const caption = captionResponse.text; // Fixed: captionResponse.text directly access text property if available, or need candidate check but keeping simple based on old code

  return { imageUrl, caption };
};

// --- FEATURE: Pre-wedding Image Generation ---
export const generatePreweddingImage = async (womanImage: File, manImage: File, theme: any, scene: string, outfit: string) => {
    const model = 'gemini-2.5-flash-image';
    const womanImagePart = await fileToGenerativePart(womanImage);
    const manImagePart = await fileToGenerativePart(manImage);
    const prompt = `You are a professional AI photo compositor. Take exact faces from uploaded photos, blend realistically onto full-body figures in a new scene.
    FACE PRESERVATION: Use exact original faces. Do NOT redraw. Retain all details.
    EXPRESSION: Natural adjustment only.
    HEADWEAR: Remove hats/peci (except glasses). Keep Hijab if present (adapt color).
    BODY/OUTFIT: Realistic anatomy. Slim/elegant woman. Dynamic pose matching "${scene}" and outfit "${outfit}".
    ENVIRONMENT: New cinematic background matching "${theme}".
    OUTPUT: Realistic photo, 9:16 Portrait, No text.`;

    const textPart = { text: prompt };
    const response = await ai.models.generateContent({
        model,
        contents: { parts: [womanImagePart, manImagePart, textPart] },
        config: { responseModalities: [Modality.IMAGE] },
    });
    
    const imagePartFromResponse = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
    if (!imagePartFromResponse?.inlineData) throw new Error("Gagal menghasilkan gambar pre-wedding.");
    
    return `data:${imagePartFromResponse.inlineData.mimeType};base64,${imagePartFromResponse.inlineData.data}`;
};

// --- FEATURE: SOP Generation ---
export const generateSop = async (procedure: string) => {
    const model = 'gemini-2.5-flash';
    const prompt = `Buat dokumen SOP formal Bahasa Indonesia untuk: "${procedure}".
        FORMAT: Tanpa markdown/bold/bintang. Huruf besar untuk judul. Struktur: I. TUJUAN, II. RUANG LINGKUP, III. TANGGUNG JAWAB, IV. PROSEDUR, V. DOKUMENTASI.
        Gaya: Formal, lugas, sistematis.`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
};

// --- FEATURE: Job Description Generation ---
export const generateJobDesc = async (profession: string) => {
    const model = 'gemini-2.5-flash';
    const prompt = `Buat Job Description formal Bahasa Indonesia untuk posisi: "${profession}".
        FORMAT: Tanpa markdown/bold/bintang. Struktur: I. NAMA POSISI, II. RINGKASAN, III. TANGGUNG JAWAB, IV. KUALIFIKASI.
        Gaya: Profesional HR.`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
};

// --- FEATURE: Recipe Generation ---
export const generateRecipe = async (dish: string) => {
    const textModel = 'gemini-2.5-flash';
    const imageModel = 'gemini-2.5-flash-image';
    const recipePrompt = `Tulis resep lengkap untuk: "${dish}". Bahasa Indonesia. Format buku resep (Nama, Deskripsi, Bahan, Cara Masak, Tips). Tanpa markdown bold/bintang.`;
    const imagePrompt = `Fotografi kuliner hyper-realistic masakan: "${dish}". Plating profesional, lighting natural, 9:16 portrait. No text.`;

    const [recipeResponse, imageResponse] = await Promise.all([
        ai.models.generateContent({ model: textModel, contents: recipePrompt }),
        ai.models.generateContent({ model: imageModel, contents: { parts: [{ text: imagePrompt }] }, config: { responseModalities: [Modality.IMAGE] } })
    ]);

    const imagePartFromResponse = imageResponse.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
    if (!imagePartFromResponse?.inlineData) throw new Error("Gagal menghasilkan gambar resep.");
    
    const imageUrl = `data:${imagePartFromResponse.inlineData.mimeType};base64,${imagePartFromResponse.inlineData.data}`;
    return { imageUrl, content: recipeResponse.text };
};

// --- FEATURE: Cartoon Photo Generation ---
export const generateCartoonPhoto = async (image: File, style: string) => {
    const model = 'gemini-2.5-flash-image';
    const imagePart = await fileToGenerativePart(image);
    const prompt = `Ubah foto jadi ilustrasi gaya kartun/anime premium.
        TUJUAN: Wajah mirip asli, pertahankan karakteristik. Jangan ubah identitas.
        GAYA: ${style}. Outline bersih, warna solid/shading halus.
        FORMAT: 9:16 Portrait. High quality illustration.`;
    
    const response = await ai.models.generateContent({
        model,
        contents: { parts: [imagePart, { text: prompt }] },
        config: { responseModalities: [Modality.IMAGE] },
    });
    const img = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
    if (!img?.inlineData) throw new Error("Gagal convert kartun.");
    return `data:${img.inlineData.mimeType};base64,${img.inlineData.data}`;
};

// --- FEATURE: Studio Photo Generation ---
export const generateStudioPhoto = async (faceImage: File, templateData: any) => {
    const model = 'gemini-2.5-flash-image';
    const imagePart = await fileToGenerativePart(faceImage);
    const prompt = `Fotografer AI profesional. Ambil wajah dari IMAGE 1, taruh di adegan baru sesuai VISUAL BRIEF.
    VISUAL BRIEF: ${templateData.label}, ${templateData.description}, ${templateData.lightingStyle}, ${templateData.moodTone}.
    ATURAN: Wajah asli dipertahankan. Hijab dipertahankan (sesuaikan warna). Tubuh/pakaian baru sesuai brief.
    OUTPUT: Foto realistis 9:16. No text.`;

    const response = await ai.models.generateContent({
        model,
        contents: { parts: [imagePart, { text: prompt }] },
        config: { responseModalities: [Modality.IMAGE] },
    });
    const img = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
    if (!img?.inlineData) throw new Error("Gagal studio photo.");
    return `data:${img.inlineData.mimeType};base64,${img.inlineData.data}`;
};

// --- FEATURE: Hook Idea ---
export const generateHookIdea = async (topic: string) => {
    const model = 'gemini-2.5-flash';
    const prompt = `Ahli viral marketing. Berikan 1 ide visual Hook Video (3 detik) kreatif & sinematik untuk topik: "${topic}". Respon: DESKRIPSI VISUAL (maks 2 kalimat) siap jadi prompt video.`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
};

// --- FEATURE: Hook Video & Product Video & Opening (Veo) ---
const generateVeoVideo = async (prompt: string, imageFile?: File, aspectRatio: string = '9:16') => {
    const localAi = new GoogleGenAI({ apiKey: API_KEY });
    let imagePayload;
    
    if (imageFile) {
        const part = await fileToGenerativePart(imageFile);
        imagePayload = { imageBytes: part.inlineData.data, mimeType: part.inlineData.mimeType };
    }

    let operation = await localAi.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt,
        ...(imagePayload && { image: imagePayload }),
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: aspectRatio }
    });

    operation = await pollVideoOperation(operation);
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Gagal generate video.");
    
    const response = await fetch(`${downloadLink}&key=${API_KEY}`);
    const videoBlob = await response.blob();
    return URL.createObjectURL(videoBlob);
};

export const generateHookVideo = async (theme: string) => {
    const prompt = `Sutradara AI. Buat Hook Video 3 detik tema '${theme}'. Menarik, cinematic, fast paced. Tanpa teks.`;
    return generateVeoVideo(prompt);
};

export const generateProductVideo = async (productImage: File) => {
    const prompt = `Sutradara komersial AI. Video produk 5 detik dari gambar ini. Fokus produk, gerakan kamera dinamis (pan/zoom), lighting mewah, cinematic e-commerce style. 9:16. No text.`;
    return generateVeoVideo(prompt, productImage);
};

export const generateOpeningVideo = async (logo: File | null, channelName: string, theme: string) => {
    // FIX: Gunakan const karena prompt tidak di-reassign
    const prompt = logo 
        ? `Video opening YouTube 3 detik tema '${theme}'. Animasikan logo ini dinamis & profesional. 16:9 Landscape.` 
        : `Video opening YouTube 3 detik tema '${theme}'. Animasikan teks: '${channelName}' tipografi keren. 16:9 Landscape.`;
        
    return generateVeoVideo(prompt, logo || undefined, '16:9');
};