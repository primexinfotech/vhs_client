import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaChevronLeft,
    FaTachometerAlt,
    FaCog,
    FaChevronDown,
    FaChevronUp,
    FaFolder,
    FaShoppingCart,
    FaSearch
} from "react-icons/fa";

export default function Sidebar({ isOpen, closeSideBar }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (window.innerWidth <= 1024) {
            closeSideBar();
        }
    }, [location.pathname]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 1024) {
                closeSideBar();
            }
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <aside
            className={`fixed lg:relative h-full z-40 bg-white dark:bg-gray-900 transition-all duration-300 border-r border-gray-200 dark:border-gray-700
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 
                w-64 lg:w-20 lg:hover:w-64 overflow-hidden shadow-xl flex flex-col group`}
        >
            {/* Mobile close button */}
            <div className="lg:hidden relative">
                <FaChevronLeft
                    className="absolute text-xl right-4 top-4 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={closeSideBar}
                />
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {/* Search (visible only when expanded) */}
                <div className="mb-4 lg:hidden lg:group-hover:block">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="block w-full py-2 pl-10 pr-3 text-sm rounded-lg bg-gray-50 border border-gray-300 
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                    </div>
                </div>

                {/* Navigation Items */}
                <NavItem
                    to="/dashboard"
                    icon={<FaTachometerAlt className="text-lg" />}
                    text="Dashboard"
                    isActive={isActive('/dashboard')}
                />

                <NavItem
                    to="/order/new"
                    icon={<FaShoppingCart className="text-lg" />}
                    text="Order"
                    isActive={isActive('/order/new')}
                />

                {/* Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors
                            ${isDropdownOpen ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                        <span className="flex items-center gap-4">
                            <FaFolder className="text-lg" />
                            <span className="hidden lg:group-hover:inline">Tools</span>
                        </span>
                        <span className="hidden lg:group-hover:inline">
                            {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                    </button>
                    {isDropdownOpen && (
                        <div className="ml-2 lg:ml-4 lg:group-hover:ml-8 mt-1 space-y-1 transition-all duration-200">
                            <DropdownItem
                                to="/tools/rate-calculator"
                                text="Rate Calculator"
                                isActive={isActive('/tools/rate-calculator')}
                            />
                            <DropdownItem
                                to="/tools/report-table"
                                text="Reports Download"
                                isActive={isActive('/tools/report-table')}
                            />
                        </div>
                    )}
                </div>

                {/* Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors
                            ${isDropdownOpen ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                        <span className="flex items-center gap-4">
                            <FaFolder className="text-lg" />
                            <span className="hidden lg:group-hover:inline">Master</span>
                        </span>
                        <span className="hidden lg:group-hover:inline">
                            {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                    </button>
                    {isDropdownOpen && (
                        <div className="ml-2 lg:ml-4 lg:group-hover:ml-8 mt-1 space-y-1 transition-all duration-200">
                            <DropdownItem
                                to="/master/country-master"
                                text="Country Master"
                                isActive={isActive('/master/country-master')}
                            />

                        </div>
                    )}
                </div>
            </nav>

            {/* Settings at bottom */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 w-full">
                <NavItem
                    to="/settings"
                    icon={<FaCog className="text-lg" />}
                    text="Settings"
                    isActive={isActive('/settings')}
                />
            </div>
        </aside>
    );
}

// NavItem component
function NavItem({ to, icon, text, isActive }) {
    return (
        <Link
            to={to}
            className={`flex items-center gap-4 p-2 rounded-lg transition-colors w-full
                ${isActive ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' :
                    'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
            <span className="min-w-[1.25rem] flex justify-center">
                {icon}
            </span>
            <span className="lg:hidden lg:group-hover:inline">
                {text}
            </span>
        </Link>
    );
}

// DropdownItem component
function DropdownItem({ to, text, isActive }) {
    return (
        <Link
            to={to}
            className={`block p-2 text-sm rounded-lg transition-colors w-full
                ${isActive ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' :
                    'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
            <span className="lg:hidden lg:group-hover:inline">
                {text}
            </span>
        </Link>
    );
}