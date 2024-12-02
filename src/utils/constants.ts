export const STORAGE_KEYS = {
  PRODUCTS: 'inventory_products',
  SALES: 'sales_history',
  INVENTORY_LOG: 'inventory_log',
} as const;

export const ORDER_TYPES = {
  SALE: 'sale',
  RETURN: 'return',
} as const;

export const INVENTORY_ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove',
} as const;