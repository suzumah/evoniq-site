import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { supabase } from '@/lib/supabase';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
    try {
        const { amount, sessionId } = await req.json();

        const options = {
            amount: amount * 100, // Razorpay works in paise
            currency: 'INR',
            receipt: sessionId || `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Update the sessionId with the new razorpay_order_id if session exists
        if (sessionId) {
            await supabase
                .from('checkout_sessions')
                .update({ razorpay_order_id: order.id, total_amount: amount })
                .eq('id', sessionId);
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error('Razorpay Error:', error);
        return NextResponse.json(
            { error: 'Failed to create Razorpay Order' },
            { status: 500 }
        );
    }
}
