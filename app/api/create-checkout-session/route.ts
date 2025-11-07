import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY! as string, {
  apiVersion: '2022-11-15' as any, // cast to bypass the type issue
});

export async function POST(req: Request) {
  try {
    const { product, email, robloxUsername } = await req.json();

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: [product.image],
              metadata: {
                robloxUsername,
              },
            },
            unit_amount: Math.round(product.price * 100), // USD cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      customer_email: email,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
