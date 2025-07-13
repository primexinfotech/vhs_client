import { useSidebar } from '@/contexts/SidebarContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Users, 
  BarChart3, 
  CreditCard, 
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  ShoppingCart,
  TrendingUp,
  UserCheck,
  Zap,
  Shield
} from 'lucide-react';

const Sidebar = () => {
  const { 
    isOpen = true, 
    isMobile = false, 
    toggleSidebar = () => {}, 
    closeSidebar = () => {} 
  } = useSidebar() || {};
  const { 
    theme = 'light', 
    sidebarColor = 'blue', 
    animationsEnabled = true, 
    compactMode = false, 
    sidebarFixed = true 
  } = useTheme() || {};
  const { isCollapsed, toggleSidebar: toggleSidebarContext } = useSidebar();
  const [location] = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { 
      icon: Package, 
      label: 'Orders', 
      path: '/orders',
      hasSubmenu: true,
      submenu: [
        { icon: ShoppingCart, label: 'All Orders', path: '/orders' },
        { icon: FileText, label: 'Pending Orders', path: '/orders/pending' },
        { icon: Truck, label: 'In Transit', path: '/orders/in-transit' },
        { icon: UserCheck, label: 'Delivered', path: '/orders/delivered' },
      ]
    },
    { 
      icon: Truck, 
      label: 'Shipments', 
      path: '/shipments',
      hasSubmenu: true,
      submenu: [
        { icon: Package, label: 'All Shipments', path: '/shipments' },
        { icon: Zap, label: 'Express', path: '/shipments/express' },
        { icon: Shield, label: 'Secured', path: '/shipments/secured' },
      ]
    },
    { icon: Users, label: 'Customers', path: '/customers' },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      path: '/analytics',
      hasSubmenu: true,
      submenu: [
        { icon: TrendingUp, label: 'Reports', path: '/analytics/reports' },
        { icon: BarChart3, label: 'Performance', path: '/analytics/performance' },
      ]
    },
    { icon: CreditCard, label: 'Billing', path: '/billing' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const getSidebarColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600', border: 'border-blue-600' },
      purple: { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-purple-600', border: 'border-purple-600' },
      green: { bg: 'bg-green-600', hover: 'hover:bg-green-700', text: 'text-green-600', border: 'border-green-600' },
      red: { bg: 'bg-red-600', hover: 'hover:bg-red-700', text: 'text-red-600', border: 'border-red-600' },
      indigo: { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-700', text: 'text-indigo-600', border: 'border-indigo-600' },
      pink: { bg: 'bg-pink-600', hover: 'hover:bg-pink-700', text: 'text-pink-600', border: 'border-pink-600' },
      teal: { bg: 'bg-teal-600', hover: 'hover:bg-teal-700', text: 'text-teal-600', border: 'border-teal-600' },
      gray: { bg: 'bg-gray-600', hover: 'hover:bg-gray-700', text: 'text-gray-600', border: 'border-gray-600' },
    };
    return colorMap[color || 'blue'] || colorMap.blue;
  };

  const toggleSubmenu = (itemLabel) => {
    setExpandedMenus(prev => {
      // Close all other submenus first
      const newState = {};
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      // Toggle the clicked submenu
      newState[itemLabel] = !prev[itemLabel];
      return newState;
    });
  };

  const getActiveClasses = (path) => {
    const isActive = location === path;
    const colorClass = getSidebarColorClasses(sidebarColor);
    return isActive 
      ? `${colorClass.text} font-semibold`
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800';
  };

  const sidebarVariants = {
    expanded: { width: '256px' },
    collapsed: { width: '64px' }
  };

  

  return (
    <motion.aside
      variants={animationsEnabled ? sidebarVariants : {}}
      initial={false}
      animate={isCollapsed && !isHovering ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 z-40 group"
      onMouseEnter={() => {
        if (isCollapsed) {
          setIsHovering(true);
        }
      }}
      onMouseLeave={() => {
        if (isCollapsed) {
          setIsHovering(false);
        }
      }}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 ${getSidebarColorClasses(sidebarColor).bg} rounded-lg flex items-center justify-center`}>
            <Truck className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              CourierPro
            </motion.h1>
          )}
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedMenus[item.label];

          return (
            <div key={item.label}>
              {/* Main Menu Item */}
              <div className="flex items-center">
                {item.hasSubmenu ? (
                  // For items with submenu, make entire area clickable for toggle
                  <motion.div
                    whileHover={animationsEnabled ? { scale: 1.02 } : {}}
                    whileTap={animationsEnabled ? { scale: 0.98 } : {}}
                    onClick={() => toggleSubmenu(item.label)}
                    className={`flex items-center justify-between w-full p-2 rounded-lg transition-all duration-200 cursor-pointer ${getActiveClasses(item.path)}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {(!isCollapsed || isHovering) && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="font-medium text-sm"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </div>
                    {(!isCollapsed || isHovering) && (
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  // For items without submenu, use Link as before
                  <Link href={item.path} className="flex-1">
                    <motion.div
                      whileHover={animationsEnabled ? { scale: 1.02 } : {}}
                      whileTap={animationsEnabled ? { scale: 0.98 } : {}}
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 cursor-pointer ${getActiveClasses(item.path)}`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {(!isCollapsed || isHovering) && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="font-medium text-sm"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>
                )}
              </div>

              {/* Submenu Items */}
              <AnimatePresence>
                {item.hasSubmenu && isExpanded && (!isCollapsed || isHovering) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="ml-6 mt-1 space-y-1 overflow-hidden"
                  >
                    {item.submenu.map((subItem) => {
                      const SubIcon = subItem.icon;
                      return (
                        <Link key={subItem.path} href={subItem.path}>
                          <motion.div
                            whileHover={animationsEnabled ? { scale: 1.02 } : {}}
                            className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 cursor-pointer ${getActiveClasses(subItem.path)}`}
                          >
                            <SubIcon className="w-3 h-3 flex-shrink-0" />
                            <span className="font-medium text-xs">{subItem.label}</span>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;