'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

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
  deleteProduct: (id: number) => void
}

const ProductsContext = createContext<ProductsContextProps | undefined>(undefined)

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])

  // Fetch products from server
  const fetchProducts = async () => {
    const res = await fetch('/api/products/get')
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const addProduct = async (product: Product) => {
    await fetch('/api/products/add', { method: 'POST', body: JSON.stringify(product) })
    fetchProducts()
  }

  const deleteProduct = async (id: number) => {
    await fetch('/api/products/delete', { method: 'POST', body: JSON.stringify({ id }) })
    fetchProducts()
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) throw new Error('useProducts must be used within ProductsProvider')
  return context
}