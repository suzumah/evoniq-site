import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            sessionId,
        } = await req.json();

        // Verifying the signature
        const secret = process.env.RAZORPAY_KEY_SECRET;

        // Creating expected signature
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', secret!)
            .update(body.toString())
            .digest('hex');

        // Check verification
        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Update database successfully
            if (sessionId) {
                await supabase
                    .from('checkout_sessions')
                    .update({
                        payment_status: 'paid',
                        razorpay_payment_id,
                        razorpay_signature,
                    })
                    .eq('id', sessionId);
            }

            return NextResponse.json(
                { message: 'Payment verified successfully.' },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: 'Invalid payment signature.' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Payment Verification error', error);
        return NextResponse.json(
            { error: 'Payment Verification Error' },
            { status: 500 }
        );
    }
}
