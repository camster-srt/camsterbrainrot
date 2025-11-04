'use client'

import { useState } from 'react'

interface Product {
  id: number
  name: string
  trait: string
  price: number
  stock: number
  image: string
}

export default function Home() {
  const [products] = useState<Product[]>([
    { id: 1, name: 'Tralalelodon', trait: 'diamond, fire', price: 27.99, stock: 1, image: '/images/tralaledon.png' },
    { id: 2, name: 'Nuclearo Dinossauro', trait: 'N/A', price: 15.00, stock: 1, image: '/images/nuclearo dinossauro.jpg' },
    { id: 3, name: 'Esok Sekolah', trait: 'N/A', price: 12.50, stock: 1, image: '/images/esok sekolah.jpg' },
  ])

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">CamsterBrainrot Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

            {/* Traits */}
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-semibold">Traits:</span> {product.trait}
            </p>

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