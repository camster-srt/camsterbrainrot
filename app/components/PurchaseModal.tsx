'use client'

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

interface PurchaseModalProps {
  product: {
    id: string;
    name: string;
    price: number;
  };
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PurchaseModal({ product }: PurchaseModalProps) {
  const [robloxUsername, setRobloxUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!robloxUsername || !email) {
      alert('Please enter Roblox username and email');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, email, robloxUsername }),
      });

      const data = await res.json();

      if (!data.sessionId) {
        alert('Failed to create checkout session');
        setLoading(false);
        return;
      }

      const stripe = (await stripePromise) as any; // ⚠ Cast to any to bypass TS
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error(err);
      alert('Checkout failed. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Roblox Username"
        value={robloxUsername}
        onChange={(e) => setRobloxUsername(e.target.value)}
        className="p-2 border rounded"
      />
      <p className="text-red-600 text-sm font-bold">
        If you enter the wrong Roblox username, you cannot get refunded.
      </p>
      <button
        onClick={handlePurchase}
        disabled={loading}
        className={`bg-green-600 text-white py-2 rounded hover:bg-green-700 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Processing...' : 'Purchase'}
      </button>
    </div>
  );
}
