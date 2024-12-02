import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="fixed z-[9999] invisible group-hover:visible bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap mt-1 transform -translate-x-1/2 translate-y-1">
        {content}
        <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -translate-y-1/2 left-1/2 -translate-x-1/2 -top-[2px]"></div>
      </div>
    </div>
  );
};