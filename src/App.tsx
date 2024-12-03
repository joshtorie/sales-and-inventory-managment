import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { AddProductModal } from './components/AddProductModal';
import { CreateOrderModal } from './components/CreateOrderModal';
import { SalesHistory } from './components/SalesHistory';
import { InventoryHistory } from './components/InventoryHistory';
import { Dashboard } from './components/Dashboard';
import { Customers } from './components/Customers';
import { storage } from './utils/storage';
import { downloadCSV } from './utils/csv';
import { Product, SalesOrder, InventoryLog, Customer } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<SalesOrder[]>([]);
  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'inventory' | 'sales' | 'inventory-history' | 'customers'>('dashboard');

  useEffect(() => {
    setProducts(storage.getProducts());
    setSales(storage.getSales());
    setInventoryLogs(storage.getInventoryLog());
    setCustomers(storage.getCustomers() || []);
  }, []);

  const addProduct = (name: string, price: number, quantity: number) => {
    const newProduct: Product = {
      id: uuidv4(),
      name,
      price,
      salesPrice: price,
      quantity,
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    storage.setProducts(updatedProducts);

    const newLog: InventoryLog = {
      id: uuidv4(),
      date: new Date().toISOString(),
      productName: name,
      quantity,
      price,
      action: 'add',
    };

    const updatedLogs = [...inventoryLogs, newLog];
    setInventoryLogs(updatedLogs);
    storage.setInventoryLog(updatedLogs);
  };

  const deleteProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    storage.setProducts(updatedProducts);

    const newLog: InventoryLog = {
      id: uuidv4(),
      date: new Date().toISOString(),
      productName: product.name,
      quantity: product.quantity,
      price: product.price,
      action: 'remove',
    };

    const updatedLogs = [...inventoryLogs, newLog];
    setInventoryLogs(updatedLogs);
    storage.setInventoryLog(updatedLogs);
  };

  const createOrder = (storeName: string, items: { productId: string; quantity: number; price: number }[]) => {
    const orderItems = items.map(item => {
      const product = products.find(p => p.id === item.productId)!;
      return {
        productId: item.productId,
        name: product.name,
        quantity: item.quantity,
        price: item.price,
      };
    });

    const total = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const isReturn = orderItems.some(item => item.quantity < 0);

    const newOrder: SalesOrder = {
      id: uuidv4(),
      date: new Date().toISOString(),
      storeName,
      items: orderItems,
      type: isReturn ? 'return' : 'sale',
      total: isReturn ? -total : total,
    };

    const updatedSales = [...sales, newOrder];
    setSales(updatedSales);
    storage.setSales(updatedSales);

    const updatedProducts = products.map(product => {
      const orderItem = orderItems.find(item => item.productId === product.id);
      if (orderItem) {
        return {
          ...product,
          quantity: product.quantity - orderItem.quantity,
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    storage.setProducts(updatedProducts);
  };

  const returnOrder = (orderId: string) => {
    const order = sales.find(s => s.id === orderId);
    if (!order) return;

    const returnItems = order.items.map(item => ({
      productId: item.productId,
      quantity: -item.quantity,
      price: item.price,
    }));

    createOrder(order.storeName, returnItems);
  };

  const deleteSalesOrder = (orderId: string) => {
    const orderToDelete = sales.find(sale => sale.id === orderId);
    if (!orderToDelete) return;

    // Update products inventory
    const updatedProducts = [...products];
    orderToDelete.items.forEach(item => {
      const product = updatedProducts.find(p => p.id === item.productId);
      if (product) {
        // If it was a sale, add the quantity back. If it was a return, subtract it
        product.quantity += orderToDelete.type === 'sale' ? item.quantity : -item.quantity;
      }
    });

    // Remove the order from sales
    const updatedSales = sales.filter(sale => sale.id !== orderId);

    // Update state and storage
    setSales(updatedSales);
    setProducts(updatedProducts);
    storage.setSales(updatedSales);
    storage.setProducts(updatedProducts);
  };

  const shareOrder = (order: SalesOrder) => {
    const text = `Order Details:\n
Store: ${order.storeName}
Date: ${new Date(order.date).toLocaleString()}
Type: ${order.type}
Total: ₪${order.total.toFixed(2)}\n
Items:
${order.items.map(item => `- ${item.name}: ${item.quantity} x ₪${item.price.toFixed(2)}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    alert('Order details copied to clipboard!');
  };

  const exportData = () => {
    downloadCSV(sales, 'sales-history');
    downloadCSV(inventoryLogs, 'inventory-history');
  };

  const handleCustomerClick = (customerId: string) => {
    setCurrentView('customers');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onCreateOrder={() => setShowCreateOrder(true)}
        onViewDashboard={() => setCurrentView('dashboard')}
        onViewInventory={() => setCurrentView('inventory')}
        onViewSales={() => setCurrentView('sales')}
        onViewInventoryHistory={() => setCurrentView('inventory-history')}
        onViewCustomers={() => setCurrentView('customers')}
        onExportData={exportData}
      />
      
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-full overflow-x-auto">
        {currentView === 'dashboard' && (
          <Dashboard
            recentSales={sales.slice(-3)}
            latestProducts={products.slice(-3)}
            recentInventory={inventoryLogs.slice(-3)}
            recentCustomers={customers.slice(-3)}
            onCustomerClick={handleCustomerClick}
          />
        )}

        {currentView === 'inventory' && (
          <div className="overflow-x-auto">
            <ProductList 
              products={products} 
              onDelete={deleteProduct}
              onViewInventoryHistory={() => setCurrentView('inventory-history')}
              onAddProduct={() => setShowAddProduct(true)}
            />
          </div>
        )}
        
        {currentView === 'sales' && (
          <div className="overflow-x-auto">
            <SalesHistory 
              sales={sales} 
              onReturn={returnOrder} 
              onShare={shareOrder}
              onDelete={deleteSalesOrder}
            />
          </div>
        )}
        
        {currentView === 'inventory-history' && (
          <div className="overflow-x-auto">
            <InventoryHistory 
              logs={inventoryLogs}
            />
          </div>
        )}

        {currentView === 'customers' && (
          <div className="overflow-x-auto">
            <Customers 
              customers={customers}
              onCustomerClick={handleCustomerClick}
            />
          </div>
        )}
      </main>

      <AddProductModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onAdd={addProduct}
      />

      <CreateOrderModal
        isOpen={showCreateOrder}
        onClose={() => setShowCreateOrder(false)}
        products={products}
        onCreateOrder={createOrder}
      />
    </div>
  );
}

export default App;