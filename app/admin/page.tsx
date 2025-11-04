'use client'

import { useState } from 'react'

interface Product {
  id: number
  name: string
  stock: number
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Brainrot Alpha', stock: 10 },
    { id: 2, name: 'Brainrot Beta', stock: 5 },
    { id: 3, name: 'Brainrot Gamma', stock: 2 },
  ])

  const updateStock = (id: number, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: newStock } : p))
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Product</th>
            <th className="py-2 px-4 border-b text-left">Stock</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td className="py-2 px-4 border-b">{p.name}</td>
              <td className="py-2 px-4 border-b">{p.stock}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  onClick={() => updateStock(p.id, p.stock + 1)}
                >
                  +1 Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}