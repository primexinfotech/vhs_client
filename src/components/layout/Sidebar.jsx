import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    FaChevronLeft,
    FaSearch
} from "react-icons/fa";

const Sidebar = ({ handleClick, sideClose }) => {
    const location = useLocation();
    const [dropdown, setDropdown] = useState();
    const pathSegments = location.pathname.split('/');
    const lastUrlValue = pathSegments[pathSegments.length - 1];
    const secondLastUrlValue = pathSegments[pathSegments.length - 2];

    const menuData = [
        {
            folderName: 'dashboard',
            menuText: 'Dashboard',
            cssClass: 'fa fa-folder-open',
            getSubMenu: []
        },
        {
            folderName: 'new',
            menuText: 'Order',
            cssClass: 'fa fa-folder-open',
            getSubMenu: [
                { menuText: 'Order', pageUrl: 'new' },
            ]
        },
        {
            folderName: 'tools',
            menuText: 'Tools',
            cssClass: 'fa fa-cog',
            getSubMenu: [
                { menuText: 'Rate Calculator', pageUrl: 'rate-calculator' },
                { menuText: 'Report Download', pageUrl: 'report-table' },
            ]
        },
        {
            folderName: 'master',
            menuText: 'Master',
            cssClass: 'fa fa-folder-open',
            getSubMenu: [
                { menuText: 'Country Master', pageUrl: 'country-master' },
                { menuText: 'State Master', pageUrl: 'state-master' },
                { menuText: 'City Master', pageUrl: 'city-master' },
                { menuText: 'Pincode Master', pageUrl: 'pincode-master' },
                { menuText: 'Vendor Master', pageUrl: 'vendor-master' },
                { menuText: 'Offline Booking', pageUrl: 'offline-booking' },
            ]
        }
    ];

   /* useEffect(() => {
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
    }, []);*/

    useEffect(() => {
        setDropdown(secondLastUrlValue);
    }, [location]);

    return (
        <div>
            <div className='relative flex items-center gap-3 pb-3 after:absolute after:w-full after:h-[2px] after:bg-gradient-to-r after:from-white after:via-yellow-400 after:to-white after:right-0 after:bottom-0'>
                
                <div className="p-2">
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
                {!sideClose ? <div className='absolute -right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-zinc-800' onClick={handleClick}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 stroke-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                </div> : ''}
            </div>

            {/* -------------side links------------------- */}
            <ul className='main_links'>
                {menuData?.map((menuData, index) => (
                    <li key={index}>
                        {menuData.getSubMenu?.length > 0 ? (
                            <>
                                <div onClick={() => {
                                    if (dropdown === menuData?.folderName) {
                                        setDropdown(null)
                                    } else {
                                        setDropdown(menuData?.folderName)
                                    }
                                }} className={`p-3 ${dropdown === menuData?.folderName ? 'bg-zinc-200' : ''} w-full text-zinc-700 flex items-center cursor-pointer justify-between gap-3`}>
                                    <div className='flex items-center gap-3'>
                                        <div><i className={`${menuData?.cssClass}`}></i></div>
                                        {menuData?.menuText}
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`size-4 transition-all ease-linear ${dropdown === menuData?.folderName ? 'rotate-90' : ''}`}>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </div>
                                </div>
                                <div className={`transition-all ease-in overflow-hidden ${dropdown === menuData?.folderName ? 'max-h-[1000px]' : 'max-h-0'}`}>
                                    <ul className={`child_links ps-8 relative after:absolute after:w-[2px] after:h-full after:bg-zinc-200 after:-translate-y-2/4 after:top-2/4 after:left-[18px] after:z-0`}>
                                        {menuData.getSubMenu?.map((subMenuData, subIndex) => (
                                            <li key={subIndex} className='z-10 relative list-disc after:absolute after:w-6 after:h-[2px] after:bg-zinc-200 after:-translate-y-2/4 after:top-2/4 after:-left-2'>
                                                <Link to={`/${menuData?.folderName}/${subMenuData.pageUrl}`} className={`block py-1 ps-6 text-sm text-zinc-500 ${subMenuData?.pageUrl.toLowerCase() === lastUrlValue.toLowerCase() ? 'text-zinc-800' : ''} hover:text-zinc-800`}>{subMenuData.menuText}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <Link to={`/${menuData?.folderName}`} className={`p-3 w-full text-zinc-700 flex items-center justify-between gap-3 ${lastUrlValue.toLowerCase() === menuData?.folderName.toLowerCase() ? 'bg-zinc-200' : ''}`}>
                                <div className='flex items-center gap-3'>
                                    <div><i className={`${menuData?.cssClass}`}></i></div>
                                    {menuData?.menuText}
                                </div>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar