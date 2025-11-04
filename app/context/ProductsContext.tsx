'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { db } from './firebaseConfig'; // <- your file path
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

interface Product {
  id?: string;
  name: string;
  trait: string;
  price: number;
  stock: number;
  image: string;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (p: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  addProduct: async () => {},
  deleteProduct: async () => {}
});

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const productsCollection = collection(db, "products");

  // Fetch products from Firestore
  const fetchProducts = async () => {
    const snapshot = await getDocs(productsCollection);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product: Product) => {
    const docRef = await addDoc(productsCollection, product);
    setProducts(prev => [...prev, { ...product, id: docRef.id }]);
  };

  const deleteProduct = async (id: string) => {
    if (!id) return;
    await deleteDoc(doc(db, "products", id));
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
