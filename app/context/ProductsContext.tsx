'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Product {
  id: number
  name: string
  trait: string
  price: number
  stock: number
  image: string
}

interface ProductsContextProps {
  products: Product[]
  addProduct: (product: Product) => void
}

const ProductsContext = createContext<ProductsContextProps | undefined>(undefined)

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Tralalelodon', trait: 'diamond, fire', price: 27.99, stock: 1, image: '/images/tralaledon.png' },
    { id: 2, name: 'Nuclearo Dinossauro', trait: 'N/A', price: 15.0, stock: 1, image: '/images/brainrot2.png' },
    { id: 3, name: 'Esok Sekolah', trait: 'N/A', price: 12.5, stock: 1, image: '/images/brainrot3.png' },
  ])

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product])
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}