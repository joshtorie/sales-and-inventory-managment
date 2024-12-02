import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-sm px-2 py-1 rounded-md bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2">
        {content}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1">
          <div className="border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
};