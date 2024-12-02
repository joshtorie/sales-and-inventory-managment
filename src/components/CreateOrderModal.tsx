import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onCreateOrder: (storeName: string, items: { productId: string; quantity: number; price: number }[]) => void;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
  products,
  onCreateOrder,
}) => {
  const [storeName, setStoreName] = useState('');
  const [orderItems, setOrderItems] = useState<{ productId: string; quantity: number; price: number }[]>([]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen && products.length > 0) {
      // Initialize with one empty item if there are products
      setOrderItems([{
        productId: products[0].id,
        quantity: 1,
        price: products[0].salesPrice
      }]);
    } else {
      setOrderItems([]);
    }
    setStoreName('');
  }, [isOpen, products]);

  if (!isOpen) return null;

  const addItem = () => {
    if (products.length > 0) {
      const firstProduct = products[0];
      setOrderItems([
        ...orderItems,
        { productId: firstProduct.id, quantity: 1, price: firstProduct.salesPrice },
      ]);
    }
  };

  const removeItem = (index: number) => {
    if (orderItems.length > 1) { // Prevent removing the last item
      setOrderItems(orderItems.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: string, value: number | string) => {
    const newItems = [...orderItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setOrderItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItems.length === 0) return;
    
    onCreateOrder(storeName, orderItems);
    setStoreName('');
    setOrderItems([]);
    onClose();
  };

  const calculateItemTotal = (quantity: number, price: number) => {
    return quantity * price;
  };

  const orderTotal = orderItems.reduce((sum, item) => sum + calculateItemTotal(item.quantity, item.price), 0);

  if (products.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">No Products Available</h2>
            <p className="text-gray-600 mb-4">Please add products to the inventory before creating an order.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                placeholder="Enter store name"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Order Items</h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Another Item
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                {orderItems.map((item, index) => {
                  const selectedProduct = products.find(p => p.id === item.productId);
                  const itemTotal = calculateItemTotal(item.quantity, item.price);
                  
                  return (
                    <div key={index} className="flex flex-col space-y-2 mb-4 p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
                          <select
                            value={item.productId}
                            onChange={(e) => {
                              const product = products.find(p => p.id === e.target.value);
                              updateItem(index, 'productId', e.target.value);
                              if (product) {
                                updateItem(index, 'price', product.salesPrice);
                              }
                            }}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            {products.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.name} (Stock: {product.quantity})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="w-32">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Order Quantity</label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Qty"
                            min={selectedProduct ? -selectedProduct.quantity : -999999}
                          />
                        </div>
                        <div className="w-40">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price (₪)</label>
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Price"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div className="w-40">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Line Total (₪)</label>
                          <div className="h-10 px-3 py-2 bg-gray-50 rounded-md border border-gray-300 text-gray-700">
                            {itemTotal.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="p-2 text-red-600 hover:text-red-900 rounded-md hover:bg-red-50"
                            disabled={orderItems.length === 1}
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {orderItems.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-lg font-medium">Order Total: </span>
                    <span className="text-lg text-gray-900">₪{orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                disabled={orderItems.length === 0 || !storeName.trim()}
              >
                Create Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};