import React, { useState } from 'react';
import { Share2, RotateCcw, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { SalesOrder } from '../types';
import { Tooltip } from './Tooltip';

interface SalesHistoryProps {
  sales: SalesOrder[];
  onReturn: (orderId: string) => void;
  onShare: (order: SalesOrder) => void;
  onDelete: (orderId: string) => void;
}

export const SalesHistory: React.FC<SalesHistoryProps> = ({
  sales,
  onReturn,
  onShare,
  onDelete,
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
    <div className="bg-white shadow-sm rounded-lg overflow-hidden min-w-[640px]">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-10 px-2 sm:px-6 py-2 sm:py-3"></th>
            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Store
            </th>
            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map((order) => (
            <React.Fragment key={order.id}>
              <tr>
                <td className="px-2 sm:px-6 py-2 sm:py-4">
                  <button
                    onClick={() => toggleOrderDetails(order.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedOrders.has(order.id) ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </td>
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </td>
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                  {order.storeName}
                </td>
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.type === 'sale'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.type === 'sale' ? 'Sale' : 'Return'}
                  </span>
                </td>
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                  ₪{order.total.toFixed(2)}
                </td>
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 overflow-visible">
                  <div className="flex space-x-1 sm:space-x-2 overflow-visible">
                    <Tooltip content="Share Order">
                      <button
                        onClick={() => onShare(order)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </Tooltip>
                    <Tooltip content="Return Order">
                      <button
                        onClick={() => onReturn(order.id)}
                        className="text-blue-600 hover:text-blue-900"
                        disabled={order.type === 'return'}
                      >
                        <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </Tooltip>
                    <Tooltip content="Delete Order">
                      <button
                        onClick={() => onDelete(order.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
              {expandedOrders.has(order.id) && (
                <tr>
                  <td colSpan={6} className="px-2 sm:px-6 py-2 sm:py-4 bg-gray-50">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                {item.productName}
                              </td>
                              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                {item.quantity}
                              </td>
                              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                ₪{item.price.toFixed(2)}
                              </td>
                              <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
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