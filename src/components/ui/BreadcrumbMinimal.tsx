'use client';

import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbMinimalProps {
  items: BreadcrumbItem[];
}

const BreadcrumbMinimal: React.FC<BreadcrumbMinimalProps> = ({ items }) => {
  return (
    <div className="breadcrumb-minimal py-4 bg-gray-50">
      <div className="container mx-auto px-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            {items.map((item, index) => (
              <li key={index} className="inline-flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-gray-400">/</span>
                )}
                {item.active ? (
                  <span className="text-gray-700 font-medium">{item.label}</span>
                ) : (
                  <Link 
                    href={item.href}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default BreadcrumbMinimal;
