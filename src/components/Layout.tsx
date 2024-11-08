import React, { useState } from 'react';
import { Menu, Users, Map, Home, BarChart3, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeSection, 
  onSectionChange 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navigationItems = [
    { id: 'dashboard', icon: Home, text: 'Dashboard' },
    { id: 'personas', icon: Users, text: 'Personas' },
    { id: 'journeys', icon: Map, text: 'Journeys' },
    { id: 'analytics', icon: BarChart3, text: 'Analytics' },
    { id: 'settings', icon: Settings, text: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 transform bg-white w-[280px] z-50 transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-64",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Home className="w-8 h-8 text-primary" />
              <span className="ml-3 text-xl font-semibold text-gray-800">CX Compass</span>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 md:hidden touch-friendly-button"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setIsSidebarOpen(false);
                }}
                className={cn(
                  "flex items-center w-full px-4 py-3 text-sm font-medium rounded-md group touch-friendly-button",
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 mr-3",
                  activeSection === item.id
                    ? "text-primary"
                    : "text-gray-400 group-hover:text-gray-500"
                )} />
                {item.text}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 md:hidden touch-friendly-button"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="md:hidden text-lg font-semibold text-gray-800">CX Compass</div>
          <div className="flex items-center space-x-4">
            {/* Add mobile-specific header actions here */}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};