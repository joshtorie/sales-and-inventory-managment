export interface Product {
  id: string;
  name: string;
  price: number;
  salesPrice: number;
  quantity: number;
}

export interface SalesOrder {
  id: string;
  date: string;
  storeName: string;
  items: OrderItem[];
  type: 'sale' | 'return';
  total: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface InventoryLog {
  id: string;
  date: string;
  productName: string;
  quantity: number;
  price: number;
  action: 'add' | 'remove';
}