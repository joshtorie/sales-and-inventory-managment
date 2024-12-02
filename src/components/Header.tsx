import React from 'react';
import { PlusCircle, ClipboardList, History, Database, Download } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface HeaderProps {
  onCreateOrder: () => void;
  onAddProduct: () => void;
  onViewSales: () => void;
  onViewInventoryHistory: () => void;
  onExportData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onCreateOrder,
  onAddProduct,
  onViewSales,
  onViewInventoryHistory,
  onExportData,
}) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <div className="flex space-x-4">
            <Tooltip content="Create Order">
              <button
                onClick={onCreateOrder}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <ClipboardList className="w-6 h-6" />
              </button>
            </Tooltip>
            <Tooltip content="Add Product">
              <button
                onClick={onAddProduct}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            </Tooltip>
            <Tooltip content="Sales History">
              <button
                onClick={onViewSales}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <History className="w-6 h-6" />
              </button>
            </Tooltip>
            <Tooltip content="Inventory History">
              <button
                onClick={onViewInventoryHistory}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Database className="w-6 h-6" />
              </button>
            </Tooltip>
            <Tooltip content="Export Data">
              <button
                onClick={onExportData}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Download className="w-6 h-6" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
};