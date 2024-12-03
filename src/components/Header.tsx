import React from 'react';
import { LayoutDashboard, ClipboardList, History, Package, Users, Download } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface HeaderProps {
  onCreateOrder: () => void;
  onViewDashboard: () => void;
  onViewInventory: () => void;
  onViewSales: () => void;
  onViewInventoryHistory: () => void;
  onViewCustomers: () => void;
  onExportData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onCreateOrder,
  onViewDashboard,
  onViewInventory,
  onViewSales,
  onViewInventoryHistory,
  onViewCustomers,
  onExportData,
}) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Inventory Management</h1>
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Tooltip content="Dashboard">
              <button
                onClick={onViewDashboard}
                className="p-1 sm:p-2 text-gray-600 hover:text-gray-900"
              >
                <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </Tooltip>
            <Tooltip content="Create Order">
              <button
                onClick={onCreateOrder}
                className="p-1 sm:p-2 text-gray-600 hover:text-gray-900"
              >
                <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </Tooltip>
            <Tooltip content="Inventory">
              <button
                onClick={onViewInventory}
                className="p-1 sm:p-2 text-gray-600 hover:text-gray-900"
              >
                <Package className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </Tooltip>
            <Tooltip content="Sales History">
              <button
                onClick={onViewSales}
                className="p-1 sm:p-2 text-gray-600 hover:text-gray-900"
              >
                <History className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </Tooltip>
            <Tooltip content="Inventory History">
              <button
                onClick={onViewInventoryHistory}
                className="p-1 sm:p-2 text-gray-600 hover:text-gray-900"
              >
                <Package className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </Tooltip>
            <Tooltip content="Customers">
              <button
                onClick={onViewCustomers}
                className="p-1 sm:p-2 text-gray-600 hover:text-gray-900"
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </Tooltip>
            <Tooltip content="Export Data">
              <button
                onClick={onExportData}
                className="p-1 sm:p-2 text-gray-600 hover:text-gray-900"
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
};