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
  customerName: string;
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

export interface Customer {
  id: string;
  name: string;
  email?: string;
  orders: SalesOrder[];
  createdAt: string;
}