'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  trait: string;
  price: number;
  stock: number;
  image: string;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  addProduct: () => {},
  deleteProduct: () => {},
});

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from Firestore on mount
  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const productsData: Product[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Product));
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  const addProduct = async (product: Omit<Product, "id">) => {
    const docRef = await addDoc(collection(db, "products"), product);
    setProducts(prev => [...prev, { id: docRef.id, ...product }]);
  };

  const deleteProduct = async (id: string) => {
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