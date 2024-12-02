import { Product, SalesOrder } from '../types';

export const formatCurrency = (amount: number): string => {
  return `₪${amount.toFixed(2)}`;
};

export const formatOrderSummary = (order: SalesOrder): string => {
  return `Order Details:\n
Store: ${order.storeName}
Date: ${new Date(order.date).toLocaleString()}
Type: ${order.type}
Total: ${formatCurrency(order.total)}\n
Items:
${order.items.map(item => `- ${item.name}: ${item.quantity} x ${formatCurrency(item.price)}`).join('\n')}`;
};

export const calculateTotal = (items: { quantity: number; price: number }[]): number => {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
};

export const validateProduct = (product: Partial<Product>): boolean => {
  return !!(
    product.name &&
    product.price &&
    product.quantity &&
    product.price >= 0 &&
    product.quantity >= 0
  );
};