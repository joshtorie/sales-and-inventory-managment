import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative group inline-flex">
      {children}
      <div className="absolute z-50 invisible group-hover:visible bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap -mt-1 left-1/2 transform -translate-x-1/2 -translate-y-full">
        {content}
        <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 translate-y-1/2 left-1/2 -translate-x-1/2 bottom-0"></div>
      </div>
    </div>
  );
};