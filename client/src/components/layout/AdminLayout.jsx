import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import Sidebar from './Sidebar';
import Header from './Header';
import ThemePanel from './ThemePanel';
import { useState } from 'react';

const AdminLayoutContent = ({ children }) => {
  const [isThemePanelOpen, setIsThemePanelOpen] = useState(false);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const { navbarVisible } = useTheme();
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {navbarVisible && (
          <Header onThemeToggle={() => setIsThemePanelOpen(true)} />
        )}

        {/* Floating navbar trigger when navbar is hidden */}
        {!navbarVisible && (
          <div 
            className="fixed top-2 right-2 z-50"
            onMouseEnter={() => setShowFloatingNav(true)}
            onMouseLeave={() => setShowFloatingNav(false)}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-1">
              <button 
                onClick={() => setIsThemePanelOpen(true)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {showFloatingNav && (
              <div className="absolute top-0 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 w-64 transform transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
                  <button 
                    onClick={() => setIsThemePanelOpen(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Theme
                  </button>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Navbar is hidden. Toggle from theme panel.
                </div>
              </div>
            )}
          </div>
        )}

        <main className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
          {children}
        </main>
      </div>
      <ThemePanel 
        isOpen={isThemePanelOpen} 
        onClose={() => setIsThemePanelOpen(false)} 
      />
    </div>
  );
};

const AdminLayout = ({ children }) => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AdminLayoutContent>
          {children}
        </AdminLayoutContent>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AdminLayout;