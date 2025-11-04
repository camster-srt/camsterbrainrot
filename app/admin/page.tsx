'use client'

import { useState } from 'react'
import { useProducts } from '../context/ProductsContext'

export default function Admin() {
  const { products, addProduct, deleteProduct } = useProducts()
  const [name, setName] = useState('')
  const [trait, setTrait] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [stock, setStock] = useState<number>(0)
  const [image, setImage] = useState('')

  const handleAddProduct = () => {
    if (!name || !image) return alert('Please provide name and image URL')
    addProduct({ id: Date.now(), name, trait, price, stock, image })
    setName(''); setTrait(''); setPrice(0); setStock(0); setImage('')
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Panel</h1>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
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

      <div className="mt-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Current Products</h2>
        {products.map(p => (
          <div key={p.id} className="p-4 mb-2 bg-white rounded shadow flex justify-between items-center">
            <p><strong>{p.name}</strong> - ${p.price.toFixed(2)} - Stock: {p.stock}</p>
            <button className="text-red-600 font-bold text-xl" onClick={() => deleteProduct(p.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </main>
  )
}