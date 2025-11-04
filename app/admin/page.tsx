'use client'

import { useState } from 'react'
import { useProducts } from '../context/ProductsContext'

export default function Admin() {
  const { addProduct } = useProducts()
  const [name, setName] = useState('')
  const [trait, setTrait] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [image, setImage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addProduct({
      name,
      trait,
      price: parseFloat(price),
      stock: parseInt(stock),
      image,
    })
    setName('')
    setTrait('')
    setPrice('')
    setStock('')
    setImage('')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Traits" value={trait} onChange={e => setTrait(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Add Brainrot
        </button>
      </form>
    </div>
  )
}