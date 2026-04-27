import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Panggil kunci dari .env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { affiliateId, amount, gopayNumber } = body;

        const { data, error } = await resend.emails.send({
            // 'onboarding@resend.dev' adalah email default dari Resend untuk testing
            from: 'TokoBoost System <onboarding@resend.dev>', 
            // GANTI INI DENGAN EMAIL PRIBADI LU
            to: ['mailbox.epril@gmail.com'], 
            subject: `🚨 Request WD Masuk: Rp ${amount.toLocaleString('id-ID')}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
                    <h2 style="color: #e11d48;">Ada Request Pencairan Saldo Baru!</h2>
                    <p>Halo Bro, ada afiliator yang barusan narik komisi nih. Berikut detailnya:</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>ID Afiliator:</strong></td>
                            <td style="padding: 8px; border-bottom: 1px solid #eee;">${affiliateId}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Nominal WD:</strong></td>
                            <td style="padding: 8px; border-bottom: 1px solid #eee; font-size: 18px; font-weight: bold; color: #16a34a;">
                                Rp ${amount.toLocaleString('id-ID')}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Nomor GoPay:</strong></td>
                            <td style="padding: 8px; border-bottom: 1px solid #eee; font-size: 16px; font-weight: bold;">
                                ${gopayNumber}
                            </td>
                        </tr>
                    </table>
                    <p style="margin-top: 20px; font-size: 14px; color: #666;">
                        <em>Silakan proses transfer ini dan update statusnya menjadi "processed" di Supabase.</em>
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Gagal mengirim notifikasi' }, { status: 500 });
    }
}