'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PurchaseModal({ product }: { product: any }) {
  const [email, setEmail] = useState('');
  const [robloxUsername, setRobloxUsername] = useState('');

  const handlePurchase = async () => {
    if (!email || !robloxUsername) return alert('Enter your email and Roblox username');

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, email, robloxUsername }),
      });

      const data = await res.json();

      if (data.sessionId) {
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert('Failed to create checkout session');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Roblox Username"
        value={robloxUsername}
        onChange={e => setRobloxUsername(e.target.value)}
        className="p-2 border rounded"
      />
      <p className="text-red-600 font-bold text-sm">
        Enter the correct Roblox username. No refunds if wrong.
      </p>
      <button
        onClick={handlePurchase}
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Purchase
      </button>
    </div>
  );
}
