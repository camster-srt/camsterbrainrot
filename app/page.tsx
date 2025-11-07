'use client'

import { useProducts } from './context/ProductsContext'
import PurchaseModal from './components/PurchaseModal'

export default function Home() {
  const { products } = useProducts()

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">CamsterBrainrot Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4"/>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-2">Traits: {product.trait}</p>
            <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
            <PurchaseModal product={product} />
          </div>
        ))}
      </div>
    </main>
  )
}
