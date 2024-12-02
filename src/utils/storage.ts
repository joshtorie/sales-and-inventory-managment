import { Product, SalesOrder, InventoryLog } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'inventory_products',
  SALES: 'sales_history',
  INVENTORY_LOG: 'inventory_log',
};

// Helper function to safely parse JSON with fallback
const safeJSONParse = <T>(data: string | null, fallback: T): T => {
  if (!data) return fallback;
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error('Error parsing stored data:', error);
    return fallback;
  }
};

// Helper function to safely stringify and store data
const safeStore = (key: string, data: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error storing data:', error);
    // Handle storage errors (e.g., quota exceeded)
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please clear some space and try again.');
    }
  }
};

export const storage = {
  getProducts: (): Product[] => {
    return safeJSONParse(localStorage.getItem(STORAGE_KEYS.PRODUCTS), []);
  },
  
  setProducts: (products: Product[]): void => {
    safeStore(STORAGE_KEYS.PRODUCTS, products);
  },
  
  getSales: (): SalesOrder[] => {
    return safeJSONParse(localStorage.getItem(STORAGE_KEYS.SALES), []);
  },
  
  setSales: (sales: SalesOrder[]): void => {
    safeStore(STORAGE_KEYS.SALES, sales);
  },
  
  getInventoryLog: (): InventoryLog[] => {
    return safeJSONParse(localStorage.getItem(STORAGE_KEYS.INVENTORY_LOG), []);
  },
  
  setInventoryLog: (log: InventoryLog[]): void => {
    safeStore(STORAGE_KEYS.INVENTORY_LOG, log);
  },

  // Clear all stored data
  clearAll: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  // Export all data as a single object (useful for backups)
  exportData: () => {
    return {
      products: storage.getProducts(),
      sales: storage.getSales(),
      inventoryLog: storage.getInventoryLog(),
    };
  },

  // Import data from a backup
  importData: (data: {
    products: Product[];
    sales: SalesOrder[];
    inventoryLog: InventoryLog[];
  }): void => {
    storage.setProducts(data.products);
    storage.setSales(data.sales);
    storage.setInventoryLog(data.inventoryLog);
  },
};