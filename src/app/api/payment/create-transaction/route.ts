import { NextResponse } from 'next/server';
import Midtrans from 'midtrans-client';

// Inisialisasi Midtrans Snap
const snap = new Midtrans.Snap({
    isProduction: false, // Pastikan FALSE untuk Sandbox
    serverKey: process.env.MIDTRANS_SERVER_KEY || "", 
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { order_id, gross_amount, customer_details } = body;

        // Validasi data
        if (!order_id || !gross_amount) {
            return NextResponse.json(
                { message: "Data transaksi tidak lengkap" }, 
                { status: 400 }
            );
        }

        const parameter = {
            transaction_details: {
                order_id: order_id,
                gross_amount: gross_amount
            },
            customer_details: {
                first_name: customer_details.first_name,
                email: customer_details.email
            },
            item_details: [{
                id: "TOKEN-TOPUP",
                price: gross_amount,
                quantity: 1,
                name: `Top Up Token`
            }]
        };

        const transaction = await snap.createTransaction(parameter);
        
        return NextResponse.json({ 
            token: transaction.token,
            redirect_url: transaction.redirect_url 
        });

    } catch (error: unknown) { // <-- GANTI 'any' JADI 'unknown'
        console.error("Midtrans Error:", error);
        
        // Cara aman ambil pesan error dari tipe 'unknown'
        const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan sistem";

        return NextResponse.json(
            { message: "Gagal memproses transaksi di server", error: errorMessage },
            { status: 500 }
        );
    }
}