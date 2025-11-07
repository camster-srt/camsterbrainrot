'use client';

import { useState } from 'react';
import { useProducts } from '../context/ProductsContext';

export default function Admin() {
  const { products, addProduct, deleteProduct } = useProducts();

  const [name, setName] = useState('');
  const [trait, setTrait] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [image, setImage] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    name: '',
    trait: '',
    price: 0,
    stock: 0,
    image: ''
  });

  // Add product
  const handleAddProduct = async () => {
    if (!name || !image) return alert('Please provide name and image URL');
    await addProduct({ name, trait, price, stock, image });
    setName(''); setTrait(''); setPrice(0); setStock(0); setImage('');
  };

  // Start editing
  const startEdit = (product: any) => {
    setEditingId(product.id);
    setEditData({
      name: product.name,
      trait: product.trait,
      price: product.price,
      stock: product.stock,
      image: product.image
    });
  };

  // Save edits
  const saveEdit = async () => {
    const product = products.find(p => p.id === editingId);
    if (!product) return;

    // Update via addProduct/deleteProduct approach
    await deleteProduct(editingId!);
    await addProduct({ ...editData });

    setEditingId(null);
    setEditData({ name: '', trait: '', price: 0, stock: 0, image: '' });
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Panel</h1>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow mb-8">
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

      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Current Products</h2>
        {products.length === 0 && <p className="text-gray-500">No products yet.</p>}

        {products.map(product => (
          <div key={product.id} className="p-4 mb-2 bg-white rounded shadow flex justify-between items-center">
            {editingId === product.id ? (
              <div className="flex-1">
                <input className="w-full p-1 mb-1 border rounded" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} />
                <input className="w-full p-1 mb-1 border rounded" value={editData.trait} onChange={e => setEditData({...editData, trait: e.target.value})} />
                <input className="w-full p-1 mb-1 border rounded" type="number" value={editData.price} onChange={e => setEditData({...editData, price: Number(e.target.value)})} />
                <input className="w-full p-1 mb-1 border rounded" type="number" value={editData.stock} onChange={e => setEditData({...editData, stock: Number(e.target.value)})} />
                <input className="w-full p-1 mb-1 border rounded" value={editData.image} onChange={e => setEditData({...editData, image: e.target.value})} />
                <button className="bg-blue-600 text-white px-2 py-1 rounded mr-2" onClick={saveEdit}>Save</button>
                <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <div>
                  <p><strong>{product.name}</strong></p>
                  <p className="text-sm text-gray-600">Traits: {product.trait}</p>
                  <p className="text-sm text-gray-600">${product.price.toFixed(2)} - Stock: {product.stock}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 font-bold text-xl" onClick={() => startEdit(product)}>✏️</button>
                  <button className="text-red-600 font-bold text-xl" onClick={() => product.id && deleteProduct(product.id)}>🗑️</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
