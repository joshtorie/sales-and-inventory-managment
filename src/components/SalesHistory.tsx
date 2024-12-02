import React, { useState } from 'react';
import { Share2, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { SalesOrder } from '../types';

interface SalesHistoryProps {
  sales: SalesOrder[];
  onReturn: (orderId: string) => void;
  onShare: (order: SalesOrder) => void;
}

export const SalesHistory: React.FC<SalesHistoryProps> = ({
  sales,
  onReturn,
  onShare,
}) => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const toggleOrderDetails = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-10 px-6 py-3"></th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Store
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map((order) => (
            <React.Fragment key={order.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleOrderDetails(order.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedOrders.has(order.id) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.storeName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.type === 'sale'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.type === 'sale' ? 'Sale' : 'Return'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₪{order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onShare(order)}
                      className="text-gray-600 hover:text-gray-900"
                      title="Share Order"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    {order.type === 'sale' && (
                      <button
                        onClick={() => onReturn(order.id)}
                        className="text-gray-600 hover:text-gray-900"
                        title="Return Order"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              {expandedOrders.has(order.id) && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 bg-gray-50">
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Product
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Unit Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 text-sm text-gray-900">
                                {item.name}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {item.quantity}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                ₪{item.price.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                ₪{(item.quantity * item.price).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};