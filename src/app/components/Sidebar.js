'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className={`fixed top-0 left-0 h-screen bg-white border-r ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 z-10`}>
      {/* Collapse button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white border rounded-full p-1.5 hover:bg-gray-50 z-20"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      {/* Logo */}
      <div className="p-4 border-b">
        <h1 className={`font-bold text-xl ${isCollapsed ? 'hidden' : 'block'}`}>Dandi AI</h1>
        {isCollapsed && <h1 className="font-bold text-xl text-center">D</h1>}
      </div>

      {/* Navigation */}
      <nav className="p-4 h-[calc(100vh-73px)] overflow-y-auto">
        <div className="mb-4">
          <div className={`text-gray-500 mb-2 ${isCollapsed ? 'hidden' : 'block'}`}>Personal</div>
          <ul className="space-y-2">
            <li>
              <Link 
                href="/dashboards"
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  isActive('/dashboards') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <span>🏠</span>
                {!isCollapsed && <span>Overview</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/assistant"
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  isActive('/assistant') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <span>🤖</span>
                {!isCollapsed && <span>Research Assistant</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/reports"
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  isActive('/reports') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <span>📄</span>
                {!isCollapsed && <span>Research Reports</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/playground"
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  isActive('/playground') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <span>⚡</span>
                {!isCollapsed && <span>API Playground</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/invoices"
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  isActive('/invoices') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <span>📋</span>
                {!isCollapsed && <span>Invoices</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/docs"
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  isActive('/docs') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <span>📚</span>
                {!isCollapsed && <span>Documentation</span>}
                {!isCollapsed && <span className="ml-auto">↗</span>}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
