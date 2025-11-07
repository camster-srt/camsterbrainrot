'use client'

import { useState } from 'react'
import { useProducts } from '../context/ProductsContext'

export default function Admin() {
  const { products, addProduct, deleteProduct } = useProducts()

  const [enteredPassword, setEnteredPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD

  const [name, setName] = useState('')
  const [trait, setTrait] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [stock, setStock] = useState<number>(0)
  const [image, setImage] = useState('')

  const handleAddProduct = async () => {
    if (!name || !image) return alert('Please provide name and image URL')

    await addProduct({
      name,
      trait,
      price,
      stock,
      image,
    })

    setName('')
    setTrait('')
    setPrice(0)
    setStock(0)
    setImage('')
  }

  const handleLogin = () => {
    if (enteredPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || enteredPassword === process.env.ADMIN_PASSWORD) {
      setAuthenticated(true)
    } else {
      alert('Incorrect password')
    }
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-md w-80">
          <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
          <input
            type="password"
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter Admin Password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Panel</h1>

      {/* Add New Product Form */}
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="Traits"
          value={trait}
          onChange={e => setTrait(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="Price"
          type="number"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
        />
        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={e => setStock(Number(e.target.value))}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
        />

        <button
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {/* Current Products */}
      <div className="mt-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Current Products</h2>
        {products.length === 0 && (
          <p className="text-gray-500">No products yet.</p>
        )}
        {products.map(product => (
          <div
            key={product.id}
            className="p-4 mb-2 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <p><strong>{product.name}</strong></p>
              <p className="text-sm text-gray-600">Traits: {product.trait}</p>
              <p className="text-sm text-gray-600">
                ${product.price.toFixed(2)} - Stock: {product.stock}
              </p>
            </div>
            <button
              className="text-red-600 font-bold text-xl"
              onClick={() => product.id && deleteProduct(product.id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
