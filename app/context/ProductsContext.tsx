'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { db } from '../firebaseConfig'
import { collection, getDocs, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'

interface Product {
  id: string
  name: string
  trait: string
  price: number
  stock: number
  image: string
}

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  addProduct: async () => {},
  deleteProduct: async () => {}
})

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Real-time listener for the 'products' collection
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[]
      setProducts(items)
    })
    return () => unsubscribe()
  }, [])

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      await addDoc(collection(db, 'products'), product)
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
