import React from 'react';

// --- TOKEN & COST CONSTANTS ---

export const OUTPUT_TOKEN_COSTS = {
  TEXT: 1,
  IMAGE: 2,
  VIDEO: 4,
};

export const INITIAL_TOKENS = 10;

// --- FEATURE-SPECIFIC CONSTANTS ---

export const HOOK_VIDEO_THEMES = [

  "Kecelakaan Mendadak (Jatuh)",
  "Kecelakaan Mendadak (Pecah)",
  "Kecelakaan Mendadak (Meledak)",
  "Terpeleset",
  "Proses Memasak Cepat",
  "Proses Melukis Cepat",
  "Proses Membuat Kerajinan Tangan Cepat",
  "Proses Makeup Cepat",
  "Proses DIY Cepat",
  "Efek Domino (Runtuh)",
  "Efek Domino (Berguling)",
  "Efek Domino (Terbakar)",
  "Kejutan Hadiah",
  "Tertimpa Benda",
  "Kejutan Tiba-tiba",
  "Unboxing Produk",
  "Video Proses (Satisfying)",
  "Video Looping Sempurna",
  "Skala Ekstrem (Raksasa)",
  "Skala Ekstrem (Miniatur)",
  "Detail Lelehan Coklat (Slow-motion)",
  "Tarikan Keju (Cheese Pull) Ekstrem",
  "Sinematik Drone Shot Cepat (Menukik)",
  "Transformasi Cepat (Before/After)",
  "Sudut Pandang (POV) Aksi Cepat",
  "Efek Kilas Balik (Flashback)",
  "Efek Waktu Berjalan Cepat (Time-lapse)",

];

export const STUDIO_PHOTO_BACKGROUNDS = [
  {
    label: "Abstract Light",
    description: "Cahaya Abstrak lembut dengan partikel halus.",
    lightingStyle: "Center glow soft light di tengah frame.",
    lensEffect: "50mm f/1.8 shallow DOF.",
    fxDetail: "Particle floating, gradien smooth.",
    moodTone: "Ethereal, abstract, ambient.",
    exampleImageUrl: "/studio/Abstract-Light.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Abstract Gradient",
    description: "Gradasi lembut dengan cahaya lampu tengah dramatis dan hyper realistis.",
    lightingStyle: "Center soft halo, ambient gradient light.",
    lensEffect: "50mm f/2.0 clean DOF.",
    fxDetail: "Floating glow particles, smooth tone.",
    moodTone: "Minimal, elegant, modern.",
    exampleImageUrl: "/studio/abstract-gradient.webp",
    width: 992,
    height: 1056,
  },
  {
    label: "Ancient stone ruins",
    description: "Reruntuhan batu dengan kabut lembut dan cahaya pagi.",
    lightingStyle: "Soft diffused sunlight, fog light rim.",
    lensEffect: "50mm f/2.0 macro feel.",
    fxDetail: "Fog reflection, moss glow.",
    moodTone: "Ancient, mystical, calm.",
    exampleImageUrl: "/studio/Ancient-Stone-Ruin.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Chic Pastel di Sofa Modern",
    description: "Wanita dengan gaun pendek pink pastel dan lengan transparan duduk di sofa bundar dengan suasana studio modern berwarna lembut.",
    lightingStyle: "Softbox ganda kanan-kiri menghasilkan pencahayaan lembut tanpa bayangan keras; tambahan fill light dari bawah untuk efek kulit bersih.",
    lensEffect: "70mm f/2.0 portrait lens, depth sedang untuk mempertahankan detail baju dan tekstur sofa.",
    fxDetail: "Tone pastel lembut, transisi warna kuning-hijau di background, highlight glossy di aksesori dan sepatu perak.",
    moodTone: "Fresh, feminin, dan elegan — gaya fashion editorial dengan aura minimalis modern.",
    exampleImageUrl: "/studio/Chic-Pastel-di-Sofa-Modern.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Cyberpunk City",
    description: "Kota yang indah dengan cahaya neon futuristik dengan refleksi basah.",
    lightingStyle: "Dual neon pink-blue, strong backlight.",
    lensEffect: "35mm f/1.4 shallow focus.",
    fxDetail: "Wet street reflection, neon bokeh.",
    moodTone: "Energetic, futuristic, high contrast.",
    exampleImageUrl: "/studio/cyberpunk-city.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Deep Blue",
    description: "Biru segar dengan nuansa damai.",
    lightingStyle: "Front light lembut, upper fill glow lembut.",
    lensEffect: "55mm f/2.5, tone biru natural.",
    fxDetail: "Subtle haze, bokeh lembut di latar.",
    moodTone: "Peaceful, calm, soothing.",
    exampleImageUrl: "/studio/deep-blue.webp",
    width: 992,
    height: 1056,
  },
  {
    label: "Desert",
    description: "Gurun Pasir dengan cahaya senja oranye keunguan.",
    lightingStyle: "Low rim light, gradient sky tone.",
    lensEffect: "85mm f/1.8 soft flare.",
    fxDetail: "Lens flare streak, sand glow.",
    moodTone: "Emotional, golden, calm.",
    exampleImageUrl: "/studio/desert.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Dramatic Black",
    description: "Studio gelap dengan siluet kuat dan cahaya lembut.",
    lightingStyle: "Sidelight kiri intens, rim light belakang kanan.",
    lensEffect: "85mm f/1.8 untuk efek depth maksimal.",
    fxDetail: "Partikel debu di cahaya, shadow detail kuat.",
    moodTone: "Dramatic, fashion, bold.",
    exampleImageUrl: "/studio/dramatic-black.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Dramatic Dark",
    description: "Studio gelap dengan pencahayaan kontras tinggi.",
    lightingStyle: "Top light tunggal dan rim light belakang lembut, shadow tegas.",
    lensEffect: "85mm f/1.4 shallow focus untuk isolasi subjek.",
    fxDetail: "Volumetric fog tipis, beam cahaya samar.",
    moodTone: "Cinematic, moody, mysterious.",
    exampleImageUrl: "/studio/Dramatic-Dark.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Elegan",
    description: "Putih bersih dengan cahaya lembut dan pantulan halus.",
    lightingStyle: "Overhead diffused + frontal light lembut.",
    lensEffect: "35mm f/2.8 menampilkan texture marmer.",
    fxDetail: "Pantulan glossy di lantai, tone luxury gold-white.",
    moodTone: "Elegant, luxurious, classy.",
    exampleImageUrl: "/studio/elegan.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Fog Forrest",
    description: "Hutan malam dengan sinar bulan menembus kabut.",
    lightingStyle: "Silver moonlight shafts dengan fog.",
    lensEffect: "50mm f/1.4 dreamy tone.",
    fxDetail: "Light particles, fog layer, subtle haze.",
    moodTone: "Mystical, moody, cinematic.",
    exampleImageUrl: "/studio/fog-forrest.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Glow Reflection",
    description: "Pemotretan editorial dengan latar oranye mengilap dan pantulan halus, menciptakan kesan hangat, mewah, dan elegan.",
    lightingStyle: "Soft key light hangat dari kanan depan dengan pantulan reflektif di latar oranye. Cahaya diarahkan untuk menonjolkan tekstur kulit dan warna rambut pirang.",
    lensEffect: "50mm f/2.0 dengan depth natural, memunculkan refleksi lembut di permukaan belakang dan bokeh oranye di area blur.",
    fxDetail: "Refleksi wajah di dinding kaca oranye, gradasi hangat keemasan di kulit, tone warna citrus dengan highlight lembut.",
    moodTone: "Hangat, classy, dan artistik — menghadirkan nuansa summer luxury editorial yang lembut dan estetis.",
    exampleImageUrl: "/studio/glow-reflection.webp",
    width: 992,
    height: 1056,
  },
  {
    label: "Gothic Catedral",
    description: "Interior katedral tua dengan cahaya dramatis.",
    lightingStyle: "Daylight shafts dari kaca patri, deep shadows.",
    lensEffect: "24mm wide arsitektur detail.",
    fxDetail: "Dust particles, volumetric light beams.",
    moodTone: "Sacred, ancient, mysterious.",
    exampleImageUrl: "/studio/gothic-catedral.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Gradient Blue Magenta",
    description: "Latar gradasi biru ke ungu dengan aura modern.",
    lightingStyle: "Front light lembut dan glow backlight tengah.",
    lensEffect: "35mm f/1.8 wide, tone halus futuristik.",
    fxDetail: "Bokeh lembut, efek difraksi ringan.",
    moodTone: "Dreamy, hi-tech, futuristic.",
    exampleImageUrl: "/studio/Gradient-blue-Magenta.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Gradient Gray",
    description: "Studio abu gradasi minimalis dengan tone profesional.",
    lightingStyle: "Key light kanan depan, fill lembut kiri, background light netral.",
    lensEffect: "70mm f/2.8 mid-tele.",
    fxDetail: "Refleksi halus di lantai beton, tone abu hangat.",
    moodTone: "Clean, neutral, modern.",
    exampleImageUrl: "/studio/gradient-gray.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Industrial",
    description: "Gudang logam dengan cahaya senja dramatis.",
    lightingStyle: "Cool daylight mix warm lamp contrast.",
    lensEffect: "35mm f/2.8 cinematic tone.",
    fxDetail: "HDR contrast, fog glow.",
    moodTone: "Industrial, cinematic, gritty.",
    exampleImageUrl: "/studio/industrial.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Nebula Cosmic",
    description: "nebula ungu dengan bintang bersinar halus dan dramatis.",
    lightingStyle: "Back rim violet, ambient blue fill.",
    lensEffect: "24mm wide cinematic.",
    fxDetail: "Lens flare, dust glow, star bloom.",
    moodTone: "Cosmic, infinite, mysterious.",
    exampleImageUrl: "/studio/nebula-cosmic.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Neon Cyber Muse",
    description: "berdiri di antara lampu neon merah dan biru, mengenakan gaun hitam mengilap dengan pantulan cahaya futuristik.",
    lightingStyle: "Dual color lighting — key light biru dari kanan dan fill light merah dari kiri; pencahayaan keras dengan bayangan lembut di kulit.",
    lensEffect: "50mm f/1.4 untuk depth dangkal, fokus kuat pada mata, dengan efek cahaya neon di pupil.",
    fxDetail: "Cahaya reflektif di kulit dan baju, efek cahaya neon bokeh di belakang, tone sinematik dengan saturasi tinggi.",
    moodTone: "Futuristik, sensual, dan intens — potret cyberpunk dengan nuansa klub neon malam.",
    exampleImageUrl: "/studio/Neon-Cyber-Muse.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Pastel Color Palette",
    description: "Studio pastel lembut penuh keceriaan.",
    lightingStyle: "Key light kiri bawah, fill light kanan atas.",
    lensEffect: "45mm f/2.0 bright airy look.",
    fxDetail: "Bokeh pastel dots di latar.",
    moodTone: "Cheerful, youthful, vibrant.",
    exampleImageUrl: "/studio/pastel-color-palette.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Princess Fuchsia",
    description: "Wanita mengenakan gaun bertingkat fuchsia dengan pencahayaan galaksi berwarna biru dan merah muda, berdiri di atas permukaan berawan yang berpendar.",
    lightingStyle: "Pencahayaan studio dua warna (blue-pink dual tone) dengan soft light menyebar dari kiri dan kanan untuk menonjolkan gradasi kain.",
    lensEffect: "50mm f/1.8, fokus tajam di wajah dengan depth lembut di bagian bawah gaun, menghasilkan kesan ethereal.",
    fxDetail: "Butiran cahaya galaksi di latar belakang, pantulan warna neon di kulit dan rambut, efek partikel halus melayang.",
    moodTone: "Romantis, dreamy, dan penuh keajaiban — nuansa seperti mimpi di dunia fantasi.",
    exampleImageUrl: "/studio/Princess-Fushia.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Princess in Winter",
    description: "Seorang wanita bergaun putih berkilau dengan gradasi warna pelangi berdiri di tebing bersalju di depan kastil megah. Adegan menonjolkan kemegahan dan keanggunan fantasi musim dingin.",
    lightingStyle: "Cahaya alami lembut dari langit musim dingin; key light dari arah depan kiri dengan refleksi salju menciptakan efek glow halus di gaun dan wajah.",
    lensEffect: "85mm f/1.4 dengan depth of field dangkal, latar kastil tampak dreamy dan sedikit blur untuk menonjolkan subjek.",
    fxDetail: "Efek bokeh lembut dari salju, partikel putih halus berkilauan di udara, saturasi pastel dengan kontras lembut.",
    moodTone: "Magical, elegan, dan megah — seperti potret kerajaan dalam dunia fantasi bersalju.",
    exampleImageUrl: "/studio/Princess-in-Winter.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Rustic Wood",
    description: "Studio kayu hangat dengan pencahayaan alami.",
    lightingStyle: "Side window light dari kiri, fill light hangat 3200K.",
    lensEffect: "50mm f/2.2 mid-depth.",
    fxDetail: "Refleksi lembut di lantai kayu satin finish.",
    moodTone: "Warm, rustic, cozy.",
    exampleImageUrl: "/studio/rustic-wood.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Studio Putih Minimalis",
    description: "Studio putih bersih dengan cahaya lembut dan refleksi lantai halus.",
    lightingStyle: "Key light 45° kiri atas dengan fill light kanan depan, soft diffused tone.",
    lensEffect: "50mm f/2.8 portrait, depth natural tanpa distorsi.",
    fxDetail: "Halo lembut di latar, refleksi glossy tipis di lantai.",
    moodTone: "Bright, clean, modern purity.",
    exampleImageUrl: "/studio/Studio-Putih-Minimalis.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Studio Monokrom Kontras Tinggi",
    description: "Studio hitam-putih bergaya editorial dengan pencahayaan alami yang tajam dan bayangan geometris di dinding.",
    lightingStyle: "Cahaya alami dari jendela kanan atas membentuk pola bayangan grid; key light keras dengan arah diagonal, tanpa fill light tambahan untuk mempertahankan kedalaman kontras.",
    lensEffect: "85mm f/1.8 portrait lens, depth of field sempit dengan fokus lembut di wajah, menciptakan efek cinematic klasik.",
    fxDetail: "Bayangan persegi dari kisi jendela di latar belakang, gradasi kontras tinggi antara area terang dan gelap, serta sedikit grain lembut untuk kesan filmik.",
    moodTone: "Dramatis, elegan, introspektif — nuansa editorial fashion klasik dengan sentuhan noir minimalis.",
    exampleImageUrl: "/studio/Studio-Monokrom-Kontras-Tinggi.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Studio Editorial Golden Light",
    description: "Pemotretan editorial elegan dengan pencahayaan alami hangat yang membentuk garis diagonal di dinding, menciptakan nuansa artistik dan profesional.",
    lightingStyle: "Key light alami dari jendela kanan atas dengan arah diagonal 45°, menghasilkan pola bayangan tegas di latar. Cahaya lembut namun kontras tinggi, tanpa fill tambahan agar tetap alami.",
    lensEffect: "85mm f/1.8 portrait lens dengan depth of field sempit, fokus tajam di wajah dan bokeh halus di latar, memberikan efek sinematik natural.",
    fxDetail: "Bayangan garis dari kisi jendela menciptakan pola ritmis di dinding, highlight lembut pada pipi dan rambut, tone warna hangat golden-hour dengan sedikit soft glow.",
    moodTone: "Elegan, tenang, dan berkelas — menonjolkan kecantikan natural dan pencahayaan golden minimalis khas fashion editorial modern.",
    exampleImageUrl: "/studio/Studio-Editorial-Golden-Light.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Street Shadow Noir",
    description: "Pria berpakaian serba hitam berdiri di jalan malam dengan cahaya biru neon dan pantulan air di aspal.",
    lightingStyle: "Single key light dari belakang kanan menciptakan siluet kontras tinggi, dengan sedikit rim light di bahu untuk memisahkan dari latar.",
    lensEffect: "35mm f/2.2 untuk framing penuh tubuh, depth cukup untuk menonjolkan tekstur jalan basah.",
    fxDetail: "Kabut tipis di latar, pantulan lampu kota di genangan air, dan efek cinematic teal-orange minimal.",
    moodTone: "Misterius, urban, dan maskulin — gaya potret malam dengan aura cyber-noir.",
    exampleImageUrl: "/studio/street-shadow-noir.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Sunflower Girl",
    description: "Wanita mengenakan blus kuning dan memegang payung besar yang dipenuhi bunga matahari di bawah langit biru cerah.",
    lightingStyle: "Cahaya alami siang hari langsung dari atas, dengan refleksi lembut dari pakaian kuning yang memantulkan hangat ke wajah.",
    lensEffect: "85mm f/1.8 dengan background bokeh awan dan kelopak bunga beterbangan.",
    fxDetail: "Warna kuning dominan dengan tone hangat, efek daun jatuh di udara, dan saturasi vivid.",
    moodTone: "Ceria, hangat, dan optimistik — seperti musim panas yang penuh kehidupan dan cahaya.",
    exampleImageUrl: "/studio/Sunflower-Girl.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Sunset Contrast",
    description: "Studio modern dengan pencahayaan warna-warni yang dramatis. Perpaduan cahaya ungu dan oranye menciptakan tampilan artistik dan eksperimental.",
    lightingStyle: "Key light hangat oranye dari kanan bawah, fill magenta dari kiri atas membentuk gradasi warna di wajah. Tidak ada fill putih agar tone tetap kuat.",
    lensEffect: "85mm f/1.4 portrait dengan depth dangkal dan fokus tajam di wajah, memberikan efek glossy pada kulit dan kontras tinggi pada latar.",
    fxDetail: "Shadow diagonal tegas di dinding, tone magenta–sunset yang membalut kulit, efek pantulan lembut pada pipi untuk kesan glowing.",
    moodTone: "Eksperimental, sensual, dan bold — menonjolkan kekuatan warna dan cahaya khas editorial fashion modern.",
    exampleImageUrl: "/studio/sunset-contrast.webp",
    width: 1056,
    height: 992,
  },
  {
    label: "Golden Sunset",
    description: "Langit keemasan dengan siluet kota seperti di film dengan suasana dramatis.",
    lightingStyle: "Backlight sunset, golden rim light.",
    lensEffect: "85mm f/1.8 dreamy flares.",
    fxDetail: "Sun rays, flare lembut, haze horizon.",
    moodTone: "Romantic, warm, nostalgic.",
    exampleImageUrl: "/studio/Golden-Sunset.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Snow Blue",
    description: "pegunungan bersalju dengan cahaya biru lembut.",
    lightingStyle: "Ambient blue fill, rim light putih dingin.",
    lensEffect: "35mm wide crisp.",
    fxDetail: "Mist lembut, aurora glow.",
    moodTone: "Serene, cold, majestic.",
    exampleImageUrl: "/studio/snow-blue.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Spring Forest",
    description: "Hutan oranye-merah dengan sinar keemasan sore.",
    lightingStyle: "Backlight warm amber, soft fill light.",
    lensEffect: "70mm f/2.0 shallow focus.",
    fxDetail: "Falling leaves, bokeh highlight.",
    moodTone: "Warm, nostalgic, romantic.",
    exampleImageUrl: "/studio/spring-forest.webp",
    width: 992,
    height: 1056,
  },
  {
    label: "Tropical Beach Sunrise",
    description: "Pantai tropis dengan cahaya matahari keemasan, tenang dan indah dengan efek cahaya yang keren.",
    lightingStyle: "Low warm sunrise light, soft rim glow.",
    lensEffect: "55mm f/2.2 natural lens flare.",
    fxDetail: "Water sparkle, soft haze horizon.",
    moodTone: "Peaceful, romantic, tropical.",
    exampleImageUrl: "/studio/Tropical-Beach-Sunrise.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Hangar Futuristic",
    description: "Ruang hanggar modern dengan cahaya metalik seperti pada film starwars.",
    lightingStyle: "Overhead spotlights, teal rim light.",
    lensEffect: "28mm wide, sharp clarity.",
    fxDetail: "Volumetric fog, reflection metal.",
    moodTone: "Hi-tech, sci-fi, sleek.",
    exampleImageUrl: "/studio/Hangar-Futuristic.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Magic Forest",
    description: "Hutan fajar dengan sinar lembut dan embun pagi yang dramatis, layaknya film avatar",
    lightingStyle: "Golden shafts through canopy.",
    lensEffect: "45mm f/1.8 soft glow.",
    fxDetail: "Dew sparkle, morning mist.",
    moodTone: "Fairytale, magical, soft.",
    exampleImageUrl: "/studio/magic-forest.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "The Storm",
    description: "Laut badai dengan kilat dari langit dikejauhan, menambah suasana dramatis dan hyper realistis.",
    lightingStyle: "Side lightning flash, moody contrast.",
    lensEffect: "35mm f/2.0 cinematic frame.",
    fxDetail: "Spray light reflection, motion blur.",
    moodTone: "Epic, powerful, dramatic.",
    exampleImageUrl: "/studio/The-Storm.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "The Canyon",
    description: "Ngarai batu besar dengan cahaya keemasan yang indah dan sangat realistis.",
    lightingStyle: "Golden sunlight hitting rock layers.",
    lensEffect: "24mm wide HDR view.",
    fxDetail: "Atmospheric haze, sunbeam depth.",
    moodTone: "Majestic, warm, natural.",
    exampleImageUrl: "/studio/the-canyon.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Mystical Snowy",
    description: "Lanskap salju dengan aurora hijau di langit yang indah, dramatis dan realistis.",
    lightingStyle: "Cool moonlight + aurora glow.",
    lensEffect: "35mm f/1.8 crisp detail.",
    fxDetail: "Snow sparkle, rim light reflection.",
    moodTone: "Magical, silent, cold beauty.",
    exampleImageUrl: "/studio/Mystical-Snowy.webp",
    width: 992,
    height: 1056,
  },
  {
    label: "Vintage",
    description: "Interior vintage dengan cahaya tungsten lembut.",
    lightingStyle: "Warm lamp pools, soft shadow falloff.",
    lensEffect: "50mm f/1.6 portrait glow.",
    fxDetail: "Dust beam, halation glow.",
    moodTone: "Nostalgic, cozy, cinematic.",
    exampleImageUrl: "/studio/vintage.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "The Galaxy",
    description: "Pemandangan galaksi dari jendela stasiun luar angkasa suasana fiksi seperti di film",
    lightingStyle: "Ambient cool light + nebula reflection.",
    lensEffect: "24mm wide low exposure.",
    fxDetail: "Glass reflection, space bloom.",
    moodTone: "Futuristic, vast, tranquil.",
    exampleImageUrl: "/studio/the-galaxy.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Latar belakang Ka'bah",
    description: "Ka'bah dengan pencahayaan alami dan suasana suci (khusus untuk background Ka'bah pria menggunakan kain ihrom tanpa alas kaki dan wanita menggunakan hijab yang sopan tanpa alas kaki).",
    lightingStyle: "Natural daylight 5600K dengan soft shadows.",
    lensEffect: "35mm f/2.8 realistic perspective.",
    fxDetail: "Marble reflection, subtle haze.",
    moodTone: "Sacred, peaceful, spiritual.",
    exampleImageUrl: "/studio/Latar-Belakang-Ka'bah.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Latar belakang Masjid Madinah",
    description: "Masjid Nabawi dengan kubah hijau dan cahaya alami.",
    lightingStyle: "Bright daylight dengan bayangan lembut.",
    lensEffect: "35mm f/2.8 balanced tone.",
    fxDetail: "Soft marble reflection, warm clarity.",
    moodTone: "Holy, serene, bright.",
    exampleImageUrl: "/studio/Latar-Belakang-Masjid-Madinah.webp",
    width: 1056,
    height: 992,
  },
  {
    label: "Dalam Masjid Nabawi",
    description: "Masjid Nabawi dengan pilar megah, suasana tenang dan hyper realistis.",
    lightingStyle: "Natural + soft artificial mixed light.",
    lensEffect: "35mm f/2.0 indoor clarity.",
    fxDetail: "Lamp glow, soft carpet reflection.",
    moodTone: "Sacred, calm, reverent.",
    exampleImageUrl: "/studio/Latar-Belakang-Masjid-Nabawi.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Latar belakang Mesjid Al-Aqsa",
    description: "Masjid Al-Aqsa dengan kubah perak dan jamaah.",
    lightingStyle: "Natural daylight dengan highlight lembut.",
    lensEffect: "35mm f/2.8 normal lens.",
    fxDetail: "Stone reflection, ambient shadow.",
    moodTone: "Spiritual, cultural, sacred.",
    exampleImageUrl: "/studio/Latar-Belakang-Mesjid-Al-Aqsa.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Pass Photo - Background Putih Formal",
    description: "Latar putih Polos sesuai **standar foto KTP dan dokumen resmi** dengan cahaya seimbang dan kontras lembut, resolusi yang tinggi. object zoom in dari atas kepala sampai perut, dengan pandangan lurus ke arah kamera, fokus, tanpa gaya.",
    lightingStyle: "Key light frontal simetris, fill light kanan-kiri lembut tanpa shadow keras.",
    lensEffect: "85mm f/5.6 mid-depth untuk hasil wajah natural dan tajam.",
    fxDetail: "Refleksi sangat halus di latar belakang putih, tanpa flare atau vignette.",
    moodTone: "Clean, official, neutral tone.",
    exampleImageUrl: "/studio/Pass-Photo-Background-Putih-Formal.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Pass Photo - Background Biru Formal",
    description: "Latar biru Polos sesuai **standar foto KTP dan dokumen resmi** dengan cahaya seimbang dan kontras lembut, resolusi yang tinggi. object zoom in dari atas kepala sampai perut, dengan pandangan lurus ke arah kamera, fokus, tanpa gaya.",
    lightingStyle: "Front soft light 45°, fill light tipis dari bawah, tanpa highlight berlebih.",
    lensEffect: "70mm f/4.0, fokus sedang dengan DOF natural.",
    fxDetail: "Gradasi biru halus dari tengah ke tepi untuk kedalaman visual.",
    moodTone: "Professional, calm, trustworthy.",
    exampleImageUrl: "/studio/Pass-Photo-Background-Biru-Formal.webp",
    width: 1024,
    height: 1024,
  },
  {
    label: "Pass Photo - Background Merah Formal",
    description: "Latar merah Polos sesuai **standar foto KTP dan dokumen resmi** dengan cahaya seimbang dan kontras lembut, resolusi yang tinggi. object zoom in dari atas kepala sampai perut, dengan pandangan lurus ke arah kamera, fokus, tanpa gaya.",
    lightingStyle: "Key light frontal, rim light lembut di tepi kepala untuk pisahkan dari latar.",
    lensEffect: "85mm f/4.5 portrait, clarity tinggi, tanpa distorsi.",
    fxDetail: "Vignette halus di pinggir frame, tone merah seimbang tanpa over-saturation.",
    moodTone: "Strong, confident, authoritative.",
    exampleImageUrl: "/studio/Pass-Photo-Background-Merah-Formal.webp",
    width: 1056,
    height: 992,
  },
];

export const PREWEDDING_THEMES = [

  {
    label: "Beach Sunset - Pantai Sore Hari",
    setting: "Pantai pasir putih dengan ombak lembut dan langit jingga keemasan, suasana hangat menjelang senja.",
    lighting: "Golden reflection, rim light lembut dari belakang.",
    lightingStyle: "Soft Backlight, Golden Rim Light",
    lensEffect: "Subtle Lens Flare, Shallow Depth of Field",
    fxDetail: "Water Splashes, Footprints in Sand, Sunset Glow",
    moodTone: "Joyful, Warm, Energetic, Passionate",
    exampleImageUrl: "/prewedding/beach-sunset-pantai-sore-hari.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "City Night Elegance - Kota Malam",
    setting: "Rooftop gedung tinggi dengan cahaya lampu kota berpendar di belakang, angin lembut meniup rambut dan pakaian.",
    lighting: "Bokeh neon citylight, cahaya lembut dari samping kanan.",
    lightingStyle: "Cool Tone Soft Key Light, Bokeh Background",
    lensEffect: "Anamorphic Bokeh, Soft Lens Flare",
    fxDetail: "City Light Reflection, Subtle Glow on Skin",
    moodTone: "Modern, Elegant, Cool, Romantic",
    exampleImageUrl: "/prewedding/city-night-elegance-kota-malam.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Classic Theater Glamour - Panggung Romantis",
    setting: "Panggung teater klasik dengan tirai merah dan cahaya spotlight hangat.",
    lighting: "Warm stage light dari atas, shadow kontras di sekitar.",
    lightingStyle: "Spotlight, Hard Key Light",
    lensEffect: "Soft Focus Glow, Vintage Filter",
    fxDetail: "Stage Dust Particles, Curtain Shadows",
    moodTone: "Dramatic, Elegant, Intimate",
    exampleImageUrl: "/prewedding/classic-theater-glamour-panggung-romantis.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Countryside Picnic - Suasana Piknik",
    setting: "Padang rumput hijau dengan tikar piknik, buah, dan bunga liar.",
    lighting: "Soft daylight dengan warna hangat alami.",
    lightingStyle: "Diffused Daylight, Gentle Fill Light",
    lensEffect: "Warm Filter, Shallow Depth of Field",
    fxDetail: "Grass Texture, Floating Dust Particles",
    moodTone: "Happy, Casual, Lighthearted",
    exampleImageUrl: "/prewedding/countryside-picnic-suasana-piknik.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Cinematic Train Station - Stasiun Klasik",
    setting: "Stasiun kereta tua dengan sinar matahari sore masuk dari jendela tinggi, sedikit kabut tipis dari uap kereta.",
    lighting: "Golden directional light dengan ambient dust glow.",
    lightingStyle: "Cinematic Sunbeam, Warm Haze",
    lensEffect: "Film Grain, Bloom Highlight",
    fxDetail: "Dust Particles, Light Rays, Steam Smoke",
    moodTone: "Nostalgic, Romantic, Timeless",
    exampleImageUrl: "/prewedding/cinematic-train-station-stasiun-klasik.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Coffee Shop Reflection - Cermin Kenangan",
    setting: "Kafe hangat di sore hari dengan kaca besar menghadap jalan kota. Uap kopi mengepul di atas meja, suasana intim namun melankolis.",
    lighting: "Soft warm indoor light dari jendela, dipadukan dengan bokeh lampu jalan dari luar.",
    lightingStyle: "Natural Window Light, Mixed Warm-Cool Ambient",
    lensEffect: "Window Reflection, Shallow Depth of Field",
    fxDetail: "Steam from Coffee, Rain Droplets on Window, Street Bokeh",
    moodTone: "Nostalgic, Warm, Reflective",
    exampleImageUrl: "/prewedding/coffee-shop-reflection-cermin-kenangan.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Desert Glamour - Gurun Pasir",
    setting: "Padang pasir luas dengan pasir berombak dan langit oranye keunguan.",
    lighting: "Golden hour dengan backlight dramatis.",
    lightingStyle: "Warm Backlight, Silhouette Rim Light",
    lensEffect: "Anamorphic Lens Flare, Warm Filter",
    fxDetail: "Flying Sand Particles, Heat Haze, Long Shadows",
    moodTone: "Epic, Romantic, Cinematic",
    exampleImageUrl: "/prewedding/desert-glamour-gurun-pasir.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "European Street Chic - Jalanan di Eropa",
    setting: "Jalan berbatu di kota tua Eropa seperti Paris atau Florence, jendela kafe dan lampu jalan klasik.",
    lighting: "Cahaya sore keemasan memantul di jendela kafe.",
    lightingStyle: "Golden Hour, Natural Light",
    lensEffect: "Shallow Depth of Field, Window Reflections",
    fxDetail: "Cobblestone Texture, Warm Air Haze",
    moodTone: "Candid, Warm, Classic, Chic",
    exampleImageUrl: "/prewedding/european-street-chic-jalanan-di-eropa.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Forest Fairytale - Hutan Fantasi",
    setting: "Hutan lebat dengan sinar matahari menembus kabut lembut, bunga bercahaya dan partikel ajaib di udara.",
    lighting: "Dappled sunlight, misty glow.",
    lightingStyle: "Dreamy Soft Light, Magical Rays",
    lensEffect: "Bloom Effect, Dreamy Bokeh",
    fxDetail: "Light Particles, Floating Petals, Subtle Mist",
    moodTone: "Magical, Dreamy, Ethereal",
    exampleImageUrl: "/prewedding/forest-fairytale-hutan-fantasi.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Forest Serenity - Hutan",
    setting: "Hutan pinus dengan sinar matahari menembus dedaunan.",
    lighting: "Beam light alami, sedikit bokeh daun.",
    lightingStyle: "Dappled Light, God Rays",
    lensEffect: "Bokeh, Shallow Depth of Field",
    fxDetail: "Sunbeams Through Trees, Light Haze, Falling Leaves",
    moodTone: "Peaceful, Calm, Earthy",
    exampleImageUrl: "/prewedding/forest-serenity-hutan.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Garden Romance - Taman",
    setting: "Taman bunga berwarna-warni di sore hari, kelopak beterbangan tertiup angin lembut, pasangan berjalan atau saling menatap di antara bunga.",
    lighting: "Soft golden hour, sinar matahari hangat menyentuh kelopak bunga.",
    lightingStyle: "Soft Natural Light, Warm Backlight, Diffused Glow",
    lensEffect: "Dreamy Bokeh, Shallow Depth of Field",
    fxDetail: "Floating Flower Petals, Soft Wind Motion Blur",
    moodTone: "Warm, Romantic, Serene",
    exampleImageUrl: "/prewedding/garden-romance-taman.webp", 
    width: 1024,  
    height: 1024, 
  },

  {
    label: "Jawa - Tradisi Agung",
    setting: "Pasangan mengenakan busana adat Jawa klasik di studio gelap, latar polos berwarna hitam pekat untuk menonjolkan detail busana dan ekspresi.",
    lighting: "Pencahayaan lembut dari samping (Rembrandt light) dengan tone hangat keemasan.",
    lightingStyle: "Warm Side Light, Low Key Lighting",
    lensEffect: "Soft Focus, Subtle Vignette",
    fxDetail: "Tekstur kain batik terlihat jelas, efek cahaya lembut menyoroti wajah dan keris.",
    moodTone: "Elegant, Heritage, Intimate",
    sceneDirection: "AI dapat menggambarkan suasana penuh wibawa dan keanggunan tradisi Jawa dengan komposisi klasik studio potret kerajaan.",
    exampleImageUrl: "/prewedding/jawa-tradisi-agung.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Jawa - Keraton Heritage",
    setting: "Pasangan mengenakan pakaian adat Jawa dalam ruangan antik bergaya keraton dengan ornamen kayu dan ukiran tradisional.",
    lighting: "Cahaya hangat dari lampu minyak atau chandelier, menciptakan bayangan lembut pada dinding dan pakaian.",
    lightingStyle: "Warm Ambient Light, Classic Interior Lighting",
    lensEffect: "Shallow Depth of Field, Vintage Tone",
    fxDetail: "Efek tekstur kayu dan refleksi halus pada ornamen logam, nuansa keemasan di udara.",
    moodTone: "Regal, Classic, Historical",
    sceneDirection: "AI dapat menonjolkan kemewahan budaya keraton dengan pose formal dan atmosfer nostalgia klasik Jawa.",
    exampleImageUrl: "/prewedding/jawa-keraton-heritage.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Jawa - Modern Classic",
    setting: "Pasangan mengenakan busana adat Jawa hitam dan batik coklat di ruang elegan dengan nuansa modern klasik dan perabotan emas.",
    lighting: "Soft key light dengan backlight halus dari jendela, tone hangat dan kontras lembut.",
    lightingStyle: "Soft Key Light, Warm Backlight",
    lensEffect: "Crisp Portrait Focus, Subtle Glow",
    fxDetail: "Refleksi lembut pada kain beludru dan batik, detail tekstur halus.",
    moodTone: "Elegant, Confident, Timeless",
    sceneDirection: "AI dapat menciptakan kesan perpaduan tradisi dan modernitas, menghadirkan kemewahan batik dalam komposisi simetris dan berkelas.",
    exampleImageUrl: "/prewedding/jawa-modern-classic.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Jawa - Royal Majestic",
    setting: "Pasangan mengenakan busana adat Jawa berhias emas dengan latar istana atau aula berlampu kristal.",
    lighting: "Golden chandelier light dengan soft rim light di rambut dan kain.",
    lightingStyle: "Warm Overhead Light, Golden Rim Light",
    lensEffect: "Elegant Bokeh, Highlight Glow",
    fxDetail: "Refleksi cahaya dari perhiasan dan ornamen emas, kesan kemegahan klasik.",
    moodTone: "Royal, Glamorous, Majestic",
    sceneDirection: "AI dapat menggambarkan pasangan sebagai raja dan ratu Jawa dalam suasana kerajaan yang megah dan romantis.",
    exampleImageUrl: "/prewedding/jawa-royal-majestic.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Jawa - Mataram Classic",
    setting: "Busana adat Jawa Mataraman dengan paes dan blangkon khas, dipotret di aula kayu berlampu chandelier emas.",
    lighting: "Low key dengan cahaya terfokus di wajah dan busana.",
    lightingStyle: "Directional Key Light, Low Ambient",
    lensEffect: "Deep Shadows, Warm Filter",
    fxDetail: "Refleksi lembut dari perhiasan dan pola batik, tekstur kayu klasik.",
    moodTone: "Graceful, Noble, Dramatic",
    sceneDirection: "AI dapat menghadirkan kesan adat Mataram yang penuh makna dan ketenangan, dengan pencahayaan dramatis berfokus pada pasangan.",
    exampleImageUrl: "/prewedding/jawa-mataram-classic.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Luxury Ballroom - Ruangan Pesta",
    setting: "Ballroom mewah dengan chandelier kristal besar, tirai beludru, dan lantai berkilau.",
    lighting: "Warm chandelier glow dengan subtle rim light di rambut dan bahu.",
    lightingStyle: "Warm Ambient Light, Soft Rim Light",
    lensEffect: "Elegant Bokeh, Crystal Refraction",
    fxDetail: "Sparkling Light Glares, Reflection from Marble Floor",
    moodTone: "Elegant, Grand, Romantic",
    exampleImageUrl: "/prewedding/luxury-ballroom-ruangan-pesta.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Mountain View Escape - Pemandangan Gunung",
    setting: "Dataran tinggi dengan kabut lembut dan pegunungan di kejauhan.",
    lighting: "Cahaya pagi yang crisp dan natural.",
    lightingStyle: "Crisp Morning Light, Soft Diffusion",
    lensEffect: "Wide-Angle Lens, Deep Depth of Field",
    fxDetail: "Soft Mist, Light Flare over Mountains",
    moodTone: "Epic, Serene, Natural",
    exampleImageUrl: "/prewedding/mountain-view-escape-pemandangan-gunung.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Riverside Reflection - Pantulan Cahaya Danau",
    setting: "Tepi danau tenang dengan air berkilau memantulkan cahaya senja.",
    lighting: "Golden hour reflektif.",
    lightingStyle: "Golden Hour Side Light, Soft Reflection Glow",
    lensEffect: "Water Reflection, Bokeh",
    fxDetail: "Ripples in Water, Soft Lens Flare",
    moodTone: "Intimate, Calm, Reflective, Romantic",
    exampleImageUrl: "/prewedding/riverside-reflection-pantulan-cahaya-danau.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Rainy City Chic - Suasana Kota Hujan",
    setting: "Kota modern malam hari, jalanan basah memantulkan neon biru dan oranye, sedikit kabut lembab di udara.",
    lighting: "Refleksi neon dari papan reklame dan lampu jalan.",
    lightingStyle: "Wet Reflections, Mixed Cool/Warm Neon Light",
    lensEffect: "Raindrop on Lens, Bokeh Glow",
    fxDetail: "Visible Raindrops, Puddle Reflections, Umbrella Light",
    moodTone: "Cozy, Modern, Cinematic",
    exampleImageUrl: "/prewedding/rainy-city-chic-suasana-kota-hujan.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Rain Reflection Night - Jalanan Basah Malam Hari",
    setting: "Jalan kota setelah hujan, lampu jalan dan mobil menciptakan pantulan warna di aspal basah.",
    lighting: "Refleksi warna-warni neon, kontras tinggi, cahaya basah.",
    lightingStyle: "Wet Reflections, Rim Light + Neon Mix",
    lensEffect: "Raindrop Bokeh, Soft Anamorphic Flare",
    fxDetail: "Water Splash, Reflected Colors on Street",
    moodTone: "Cinematic, Passionate, Cool",
    exampleImageUrl: "/prewedding/rain-reflection-night-jalanan-basah-malam-hari.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Tropical Luxury Picnic - Tropis",
    setting: "Halaman villa tropis dekat pantai dengan kain putih, buah segar, bunga, dan cahaya matahari lembut.",
    lighting: "Bright afternoon light, warm and airy tone.",
    lightingStyle: "Soft Natural Light, Tropical Glow",
    lensEffect: "Warm Filter, Clean Focus, Light Flare",
    fxDetail: "Palm Shadows, Reflected Light from Water",
    moodTone: "Luxury, Relaxed, Romantic",
    exampleImageUrl: "/prewedding/tropical-luxury-picnic-tropis.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Umbrella in the Dark",
    setting: "Latar gelap dengan hujan ringan, pasangan berpelukan di bawah payung bercahaya.",
    lighting: "Single source light dari dalam payung, chiaroscuro high contrast.",
    lightingStyle: "Single Key Light, High Contrast",
    lensEffect: "Crisp Focus, Vignette Glow",
    fxDetail: "Raindrops on Umbrella, Soft Light Glow",
    moodTone: "Intimate, Romantic, Cinematic",
    sceneDirection: "AI dapat menggambarkan suasana hangat dan tertutup — dunia di luar gelap, hanya mereka berdua dalam cahaya lembut.",
    exampleImageUrl: "/prewedding/umbrella-in-the-dark.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Winter Elegance - Musim Dingin",
    setting: "Taman bersalju putih dengan pepohonan beku dan napas terlihat di udara dingin.",
    lighting: "Cool tone dengan soft backlight.",
    lightingStyle: "Soft Backlight, Blue Tint Cool Lighting",
    lensEffect: "Crisp Focus, Subtle Haze",
    fxDetail: "Visible Breath Mist, Falling Snowflakes",
    moodTone: "Cozy, Intimate, Calm, Cool",
    exampleImageUrl: "/prewedding/winter-elegance-musim-dingin.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Japanese Zen Garden - Taman Jepang",
    setting: "Taman batu dengan bambu, kolam koi, dan jembatan kayu kecil di tengah kabut tipis.",
    lighting: "Soft diffused daylight dengan pantulan air.",
    lightingStyle: "Cool Diffused Light, Mist Glow",
    lensEffect: "Clean Focus, Subtle Haze",
    fxDetail: "Falling Leaves, Water Ripples",
    moodTone: "Calm, Peaceful, Minimalist",
    exampleImageUrl: "/prewedding/japanese-zen-garden-taman-jepang.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Sunset Cliff Romance - Tebing Senja",
    setting: "Tebing tinggi dengan laut di bawah dan langit oranye kemerahan di kejauhan.",
    lighting: "Golden rim light dengan flare dramatis dari matahari rendah.",
    lightingStyle: "Warm Backlight, High Contrast Silhouette",
    lensEffect: "Wide Lens Flare, Atmospheric Depth",
    fxDetail: "Sea Mist, Light Rays over Horizon",
    moodTone: "Epic, Poetic, Emotional",
    exampleImageUrl: "/prewedding/sunset-cliff-romance-tebing-senja.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Rustic Barn Love - Gudang Pedesaan",
    setting: "Gudang kayu klasik dengan lampu gantung bohlam hangat dan jerami di lantai.",
    lighting: "Warm ambient dari lampu gantung, sedikit cahaya matahari masuk dari sela papan.",
    lightingStyle: "Warm Ambient Glow, Natural Rim Light",
    lensEffect: "Soft Vintage Focus, Light Grain",
    fxDetail: "Dust Particles in Air, Wooden Texture",
    moodTone: "Rustic, Cozy, Homely",
    exampleImageUrl: "/prewedding/rustic-barn-love-gudang-pedesaan.webp", 
    width: 1024,  
    height: 1024,
  },
  {
    label: "Underwater Dream - Di Dalam Air",
    setting: "Pemandangan bawah air dengan gaun melayang dan gelembung kecil di sekitar.",
    lighting: "Soft diffused light biru, cahaya dari atas permukaan air.",
    lightingStyle: "Underwater Diffusion, Ethereal Glow",
    lensEffect: "Soft Focus, Light Scattering",
    fxDetail: "Floating Fabric, Air Bubbles, Light Ripples",
    moodTone: "Dreamy, Calm, Surreal",
    exampleImageUrl: "/prewedding/underwater-dream-di-dalam-air.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Tulip Dream Field - Lembah Bunga Tulip",
    setting: "Ladang tulip warna-warni dilihat dari atas, pasangan berbaring di tengah bunga dengan senyum lepas.",
    lighting: "Bright daylight dengan tone hangat alami.",
    lightingStyle: "Top Soft Light, Natural Bloom",
    lensEffect: "Aerial Depth, Warm Filter",
    fxDetail: "Flower Texture, Soft Light Gradient",
    moodTone: "Cheerful, Intimate, Joyful",
    exampleImageUrl: "prewedding/tulip-dream-field-lembah-bunga-tulip.webp", 
    width: 1024,  
    height: 1024, 
  },
  {
    label: "Rain Embrace Drama - Pelukan di Tengah Hujan",
    setting: "Malam hujan deras dengan cahaya biru dan merah dramatis di belakang pasangan.",
    lighting: "Rim light biru dari kiri, red backlight dari kanan, kontras tinggi.",
    lightingStyle: "Dual Gel Lighting (Blue & Red), Backlit Rain Effect",
    lensEffect: "Raindrop Bokeh, High Contrast Glow",
    fxDetail: "Falling Rain, Splash Reflection on Ground",
    moodTone: "Cinematic, Passionate, Intense",
    exampleImageUrl: "/prewedding/rain-embrace-drama-pelukan-di-tengah-hujan.webp", 
    width: 1024,  
    height: 1024, 
  },
];

export const PREWEDDING_SCENES = [
  {
    label: "Forehead Kiss",
    value: "pria mencium kening wanita dengan lembut, mata terpejam, ekspresi damai."
  },
  {
    label: "Back Hug",
    value: "pria memeluk dari belakang sambil menaruh dagu di pundak wanita"
  },
  {
    label: "Nose to Nose (Almost Kiss)",
    value: "wajah nyaris bersentuhan, mata tertutup, suasana hangat."
  },
  {
    label: "Touching Hands",
    value: "jari-jari saling menyentuh perlahan, fokus ke detail tangan."
  },
  {
    label: "Resting on Shoulder",
    value: "wanita menyandarkan kepala di bahu pria, tatapan ke depan dengan senyum kecil."
  },
  {
    label: "Chasing Scene",
    value: "pria berlari mengejar wanita sambil tertawa, gerakan dinamis"
  },
  {
    label: "Lifting Spin",
    value: "pria mengangkat wanita dan memutarnya, gaun terangkat anggun."
  },
  {
    label: "Piggyback Ride",
    value: "wanita di punggung pria, ekspresi bahagia dan santai."
  },
  {
    label: "Dancing Freely",
    value: "pasangan berdansa di alam terbuka atau di tengah hujan."
  },
  {
    label: "Laughing Together",
    value: "mereka tertawa lepas saling menatap, candid natural."
  },
  {
    label: "Walking Toward Camera",
    value: "berdua jalan pelan, tangan bergandengan, fokus pada ekspresi cinta."
  },
  {
    label: "Looking in Opposite Directions",
    value: "berdampingan tapi melihat ke arah berbeda, simbol perjalanan cinta."
  },
  {
    label: "Proposal Scene",
    value: "pria berlutut memberikan cincin, wanita terkejut bahagia."
  },
  {
    label: "Veil Motion Shot",
    value: "wanita menoleh, kain veil atau hijab melambai tertiup angin"
  },
  {
    label: "Slow Dance in the Rain",
    value: "berpelukan di bawah hujan lembut, lampu bokeh di belakang."
  },
  {
    label: "Traditional Hand Gesture",
    value: "posisi tangan khas budaya (misal Jawa: nyembah / salim)."
  },
  {
    label: "Sitting Side by Side",
    value: "duduk sejajar, wanita menunduk sedikit, aura klasik elegan."
  },
  {
    label: "Holding Umbrella Together",
    value: "gaya romantis di bawah payung, cocok untuk hujan atau matahari tropis."
  },
  {
    label: "Walking with Traditional Parasol",
    value: "melangkah pelan sambil menatap satu sama lain."
  },
  {
    label: "Studio Frontal Portrait",
    value: "pose berdiri sejajar, ekspresi kalem dan percaya diri."
  },

];

export const CARTOON_STYLES = [
  {
    label: "Kartun Digital Bersih",
    description: "Gaya kartun modern seperti Pixar/Disney dengan warna solid.",
    lineArt: "tegas dan halus",
    colorTone: "cerah dan bersih",
    lighting: "key light lembut dan refleksi halus",
    mood: "ceria dan profesional"
  },
  {
    label: "Comic Style",
    description: "Gaya komik Amerika dengan garis tegas dan kontras kuat.",
    lineArt: "tebal dan dinamis",
    colorTone: "kontras tinggi dengan shading keras",
    lighting: "dramatic spotlight",
    mood: "enerjik dan heroik"
  },
  {
    label: "Chibi Cute",
    description: "Gaya karakter mini lucu dengan proporsi kepala besar.",
    lineArt: "halus dan membulat",
    colorTone: "pastel lembut",
    lighting: "soft ambient light",
    mood: "manis, imut, menyenangkan"
  },
  {
    label: "Semi-Realistic Anime Cinematic",
    description: "Gaya ilustrasi digital dengan detail wajah realistis namun tetap mempertahankan nuansa anime yang halus dan sinematik.",
    visualCharacteristics: "Wajah dan anatomi proporsional realistis, tekstur kulit lembut, pencahayaan sinematik dengan gradasi halus, rambut berkilau detail, dan warna yang kaya.",
    lineArt: "Hampir tidak terlihat, digantikan oleh shading dan edge lighting halus.",
    colorTone: "Campuran antara tone hangat dan dingin dengan saturasi tinggi, gradasi warna lembut.",
    lighting: "Directional cinematic lighting (soft key light + rim glow), menciptakan volume dan depth realistis.",
    backgroundStyle: "Lingkungan realistik bergaya film — bisa urban, langit berbintang, atau suasana senja dengan depth atmosferik.",
    mood: "Mendalam, ekspresif, dan elegan dengan sedikit aura misterius.",
  },
];

export const OPENING_VIDEO_THEMES = [
  "Modern & Clean", 
  "Gaming Glitch", 
  "Retro Wave", 
  "Cinematic Reveal", 
  "Cute & Playful"
];


// --- ICON COMPONENTS ---

export const IconGenerator = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 21v-1m0-16a1 1 0 00-1 1v1a1 1 0 002 0V5a1 1 0 00-1-1z" /></svg>
);

export const IconToken = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" /></svg>
);

export const IconLogout = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
);

export const IconImage = () => (
 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1m-4 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);

export const IconTopUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M4.877 8.553a10.02 10.02 0 0114.246 0M4.877 15.447a10.02 10.02 0 0014.246 0M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
);


export const IconFlyer = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m-1 12V12m0 0a2 2 0 00-2-2H7a2 2 0 00-2 2m0 0V8m0 0a2 2 0 012-2h4" /></svg>
);

export const IconPrewedding = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);

export const IconGreeting = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z" /></svg>
);

export const IconSOP = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002-2h2a2 2 0 002 2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
);

export const IconJob = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6a4 4 0 11-8 0 4 4 0 018 0zM12 15v6" /></svg>
);

export const IconRecipe = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494M12 6.253a4.5 4.5 0 110-3.006 4.5 4.5 0 010 3.006z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.747a4.5 4.5 0 01-4.243-3.125 4.5 4.5 0 018.486 0A4.5 4.5 0 0112 17.747z" /></svg>
);

export const IconCartoon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1m-4 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

export const IconHookVideo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);

export const IconStudioPhoto = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

export const IconProductVideo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m0 0v8m-4-8h4m10 0h4m0 0v8m-4-8h4M5 12h14" /></svg>
);

export const IconOpeningVideo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export const IconTTS = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
);

export const IconGoogle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 48 48">
    <path fill="#fbc02d" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.522 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20c11.046 0 20-8.954 20-20C44 28.946 44 24.256 43.611 20.083z"/>
  </svg>
);



// --- TAMBAHAN IKON BARU ---

// Ikon untuk tombol "Galeri"
export const IconGaleri = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1m-4 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

// Ikon untuk tombol "Kamera"
export const IconKamera = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Ikon untuk tombol "Hapus"
export const IconHapus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

{/* --- TAMBAHKAN DUA IKON SOSMED INI --- */}

export const IconTiktok = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 16 16">
    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.89 3.37 13.557 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
  </svg>
);

// --- ICON WHATSAPP (New Sleek Design) ---
export const IconWhatsapp = () => (
  // Menggunakan viewBox 16x16 untuk desain yang lebih compact
  <svg fill="currentColor" className="h-6 w-6" viewBox="0 0 16 16">
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L.055 15l3.86-1.002a7.7 7.7 0 0 0 3.822.95h.003c4.366 0 7.923-3.558 7.925-7.926a7.86 7.86 0 0 0-2.34-5.598M7.994 14.394c-1.026 0-2.01-.264-2.87-0.785l-0.203-0.12-1.95 0.508 0.51-1.95-0.12-0.202a6.83 6.83 0 0 1-1.03-3.513c0-3.79 3.09-6.878 6.88-6.88 1.83 0 3.56.717 4.88 2.045s2.046 3.05 2.046 4.88c0 3.79-3.09 6.878-6.88 6.88zM12.986 9.479c-0.198-0.099-1.173-0.58-1.354-0.645s-0.31-0.098-0.44-0.098c-0.13 0-0.34 0.05-0.53 0.232s-0.74 0.93-0.903 1.122c-0.16 0.19-0.33 0.21-0.62 0.12s-1.28-0.473-2.43-1.5c-0.89-0.79-1.48-1.78-1.65-2.07c-0.17-0.29-0.017-0.44 0.14-0.58c0.14-0.14 0.31-0.38 0.46-0.57s0.21-0.34 0.31-0.53c0.099-0.19 0.05-0.35-0.017-0.49s-0.54-1.28-0.74-1.76c-0.19-0.47-0.37-0.4-0.52-0.41s-0.3-0.018-0.46-0.018c-0.16 0-0.42 0.03-0.64 0.26s-0.82 0.8-0.82 1.95c0 1.15 0.84 2.25 0.95 2.4s1.65 2.53 4 3.46c2.35 0.93 2.35 0.62 2.76 0.58s1.29-0.05 1.47-0.31c0.18-0.26 0.18-0.47 0.12-0.57s-0.19-0.3-0.42-0.42z"/>
  </svg>
);

// --- ICON X/TWITTER (New Design) ---
export const IconX = () => (
    <svg fill="currentColor" className="h-6 w-6" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-6.18-8.155-7.79 8.155H0L9.278 11.02 0 2.25h8.566l6.18 8.155L18.244 2.25zM13.483 19.815H15.428L6.467 4.125H4.512l8.971 15.69z"/>
    </svg>
);

// --- ICON LINKEDIN (Versi yang sudah diperbaiki) ---
export const IconLinkedin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.044-1.85-3.044-1.853 0-2.136 1.445-2.136 2.948v5.665h-3.556v-11.385h3.415v1.64c.594-1.157 2.032-1.996 4.045-1.996 4.316 0 5.127 2.84 5.127 6.591v6.202zm-15.751-11.383h-3.416v11.385h3.416v-11.385zm-1.708-3.044c-1.077 0-1.954.816-1.954 1.831 0 1.012.877 1.83 1.954 1.83s1.954-.818 1.954-1.83c0-1.015-.878-1.831-1.954-1.831z"/>
  </svg>
);

// --- ICON FACEBOOK (New Simplified Design) ---
export const IconFacebook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0 0 3.603 0 8.049c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
  </svg>
);

export const IconHotel = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export const IconQuranApp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export const IconSportSimple = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6h13M9 6l-2 1m2-1l2 1m-2-1v12a4 4 0 004 4h10M5 13l4 4m0-4l-4 4" />
  </svg>
);

// --- DATA PAKET TOP UP ---
export const topUpPackages = [
    {
        id: 'paket_hemat',
        tokens: 10,
        bonus: 0,
        price: "15.000",
        popular: false
    },
    {
        id: 'paket_populer',
        tokens: 25,
        bonus: 5,
        price: "35.000",
        popular: true // Akan di-highlight border pink
    },
    {
        id: 'paket_sultan',
        tokens: 50,
        bonus: 15,
        price: "65.000",
        popular: false
    }
];