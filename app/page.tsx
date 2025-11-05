'use client'

import { useProducts } from './context/ProductsContext'
import SignInButton from './components/SignInButton'

<SignInButton />

export default function Home() {
  const { products } = useProducts()

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">CamsterBrainrot Store</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products yet. Add some in the Admin panel!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mb-2">Traits: {product.trait}</p>
              <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
