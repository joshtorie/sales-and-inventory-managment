import { useState, useEffect } from 'react';
import { Product, SalesOrder, InventoryLog } from '../types';
import { storage } from './storage';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};

export const useInventorySystem = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<SalesOrder[]>([]);
  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>([]);

  useEffect(() => {
    setProducts(storage.getProducts());
    setSales(storage.getSales());
    setInventoryLogs(storage.getInventoryLog());
  }, []);

  return {
    products,
    setProducts,
    sales,
    setSales,
    inventoryLogs,
    setInventoryLogs,
  };
};