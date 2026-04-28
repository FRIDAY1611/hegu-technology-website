'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, getAllProducts, getProductById, getProductsBySeries, getFeaturedProducts } from '@/lib/products';

interface ProductsContextType {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
  getProductsBySeries: (series: 'AC' | 'DC' | 'Outdoor' | 'Industrial') => Product[];
  getFeaturedProducts: () => Product[];
  refreshProducts: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  const refreshProducts = () => {
    setProducts(getAllProducts());
  };

  useEffect(() => {
    // 初始化产品数据
    refreshProducts();

    // 监听产品数据更新事件
    const handleProductsUpdate = () => {
      refreshProducts();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('productsUpdated', handleProductsUpdate);
      return () => {
        window.removeEventListener('productsUpdated', handleProductsUpdate);
      };
    }
  }, []);

  const getProduct = (id: string) => {
    return getProductById(id);
  };

  const getProductsBySeriesFn = (series: 'AC' | 'DC' | 'Outdoor' | 'Industrial') => {
    return getProductsBySeries(series);
  };

  const getFeaturedProductsFn = () => {
    return getFeaturedProducts();
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProduct,
        getProductsBySeries: getProductsBySeriesFn,
        getFeaturedProducts: getFeaturedProductsFn,
        refreshProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
