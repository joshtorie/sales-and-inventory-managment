import React from 'react';
import { Customer, SalesOrder } from '../types';

interface CustomersProps {
  customers: Customer[];
  sales: SalesOrder[];
  onViewSale: (saleId: string) => void;
}

export const Customers: React.FC<CustomersProps> = ({ customers, sales, onViewSale }) => {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => {
              const customerSales = sales.filter(sale => 
                customer.orders.includes(sale.id)
              );
              const totalSpent = customerSales.reduce((sum, sale) => sum + sale.total, 0);
              const lastOrder = customerSales.length > 0 
                ? new Date(Math.max(...customerSales.map(s => new Date(s.date).getTime())))
                : null;

              return (
                <tr 
                  key={customer.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => customerSales.length > 0 && onViewSale(customerSales[0].id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-500">
                      Added {new Date(customer.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customerSales.length}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {lastOrder ? lastOrder.toLocaleDateString() : 'No orders'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₪{totalSpent.toFixed(2)}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
