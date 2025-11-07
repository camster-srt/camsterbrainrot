'use client'

import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductsContext';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

interface Purchase {
  id: string;
  email: string;
  robloxUsername: string;
  productName: string;
  date: string;
}

export default function Admin() {
  const { products, addProduct, deleteProduct } = useProducts();

  const [name, setName] = useState('');
  const [trait, setTrait] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [image, setImage] = useState('');
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  // Fetch purchases from Firestore
  useEffect(() => {
    const fetchPurchases = async () => {
      const snapshot = await getDocs(collection(db, 'purchases'));
      const items: Purchase[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Purchase, 'id'>)
      }));
      setPurchases(items);
    };
    fetchPurchases();
  }, []);

  const handleAddProduct = async () => {
    if (!name || !image) return alert('Please provide name and image URL');
    await addProduct({ name, trait, price, stock, image });
    setName(''); setTrait(''); setPrice(0); setStock(0); setImage('');
  };

  const handleDeletePurchase = async (id: string) => {
    await deleteDoc(doc(db, 'purchases', id));
    setPurchases(prev => prev.filter(p => p.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col lg:flex-row gap-8">
      {/* Products Panel */}
      <div className="flex-1 max-w-lg bg-white p-6 rounded-xl shadow">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Panel</h1>

        {/* Add Product */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
          <input className="w-full p-2 mb-2 border rounded" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input className="w-full p-2 mb-2 border rounded" placeholder="Traits" value={trait} onChange={e => setTrait(e.target.value)} />
          <input className="w-full p-2 mb-2 border rounded" placeholder="Price" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
          <input className="w-full p-2 mb-2 border rounded" placeholder="Stock" type="number" value={stock} onChange={e => setStock(Number(e.target.value))} />
          <input className="w-full p-2 mb-4 border rounded" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>

        {/* Current Products */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Current Products</h2>
          {products.length === 0 && <p className="text-gray-500">No products yet.</p>}
          {products.map(product => (
            <div key={product.id} className="p-4 mb-2 bg-gray-50 rounded shadow flex justify-between items-center">
              <div>
                <p><strong>{product.name}</strong></p>
                <p className="text-sm text-gray-600">Traits: {product.trait}</p>
                <p className="text-sm text-gray-600">${product.price.toFixed(2)} - Stock: {product.stock}</p>
              </div>
              <div className="flex gap-2">
                {/* TODO: Add edit modal later */}
                <button className="text-red-600 font-bold text-xl" onClick={() => product.id && deleteProduct(product.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purchases Panel */}
      <div className="flex-1 max-w-lg bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Purchases</h2>
        {purchases.length === 0 && <p className="text-gray-500">No purchases yet.</p>}
        {purchases.map(p => (
          <div key={p.id} className="p-4 mb-2 bg-gray-50 rounded shadow flex justify-between items-center">
            <div>
              <p><strong>Email:</strong> {p.email}</p>
              <p><strong>Roblox:</strong> {p.robloxUsername}</p>
              <p><strong>Product:</strong> {p.productName}</p>
              <p className="text-sm text-gray-500">{p.date}</p>
            </div>
            <button className="text-red-600 font-bold text-xl" onClick={() => handleDeletePurchase(p.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </main>
  );
}
