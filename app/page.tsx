'use client'

import { useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  image: string
}

export default function Home() {
  const [products] = useState<Product[]>([
    { id: 1, name: 'Brainrot Alpha', price: 4.99, stock: 10, image: '/images/brainrot1.png' },
    { id: 2, name: 'Brainrot Beta', price: 9.99, stock: 5, image: '/images/brainrot2.png' },
    { id: 3, name: 'Brainrot Gamma', price: 14.99, stock: 2, image: '/images/brainrot3.png' },
  ])

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">CamsterBrainrot Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4"/>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}