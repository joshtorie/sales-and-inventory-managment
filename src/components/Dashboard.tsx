import React from 'react';
import { ShoppingCart, Package, Users } from 'lucide-react';
import { SalesOrder, Product, Customer } from '../types';

interface DashboardProps {
  recentSales: SalesOrder[];
  latestProducts: Product[];
  recentCustomers: Customer[];
  onViewSales: () => void;
  onViewInventory: () => void;
  onViewCustomers: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  recentSales,
  latestProducts,
  recentCustomers,
  onViewSales,
  onViewInventory,
  onViewCustomers,
}) => {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Sales Card */}
        <div 
          className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer"
          onClick={onViewSales}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Sales</h2>
            <ShoppingCart className="w-6 h-6 text-blue-500" />
          </div>
          <div className="space-y-3">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{sale.customerName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(sale.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-semibold">₪{sale.total.toFixed(2)}</p>
              </div>
            ))}
            {recentSales.length === 0 && (
              <p className="text-gray-500 text-sm">No recent sales</p>
            )}
          </div>
        </div>

        {/* Latest Products Card */}
        <div 
          className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer"
          onClick={onViewInventory}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Latest Products</h2>
            <Package className="w-6 h-6 text-green-500" />
          </div>
          <div className="space-y-3">
            {latestProducts.map((product) => (
              <div key={product.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {product.quantity}
                  </p>
                </div>
                <p className="font-semibold">₪{product.price.toFixed(2)}</p>
              </div>
            ))}
            {latestProducts.length === 0 && (
              <p className="text-gray-500 text-sm">No products added</p>
            )}
          </div>
        </div>

        {/* Recent Customers Card */}
        <div 
          className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer"
          onClick={onViewCustomers}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Customers</h2>
            <Users className="w-6 h-6 text-purple-500" />
          </div>
          <div className="space-y-3">
            {recentCustomers.map((customer) => (
              <div key={customer.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-gray-500">
                    Orders: {customer.orders.length}
                  </p>
                </div>
                <p className="font-semibold">
                  ₪{customer.orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
              </div>
            ))}
            {recentCustomers.length === 0 && (
              <p className="text-gray-500 text-sm">No customers yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
