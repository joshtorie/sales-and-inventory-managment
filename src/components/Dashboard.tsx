import React from 'react';
import { ShoppingCart, Package, History, Users } from 'lucide-react';
import { SalesOrder, Product, Customer, InventoryLog } from '../types';

interface DashboardProps {
  recentSales: SalesOrder[];
  latestProducts: Product[];
  recentInventory: InventoryLog[];
  recentCustomers: Customer[];
  onCustomerClick: (customerId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  recentSales,
  latestProducts,
  recentInventory,
  recentCustomers,
  onCustomerClick,
}) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Recent Sales Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Sales</h2>
            <ShoppingCart className="w-6 h-6 text-blue-500" />
          </div>
          <div className="space-y-3">
            {recentSales.slice(0, 3).map((sale) => (
              <div key={sale.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{sale.storeName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(sale.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-semibold">₪{sale.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
