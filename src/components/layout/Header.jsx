import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaBars, FaChevronDown } from "react-icons/fa";
import logo from '../../assets/logo1.png';
import icon_1 from '../../assets/icon-down.svg';
//import logo from '../../assets/logo.jpeg'
import './Header.css'

export default function Header({ handleClick, sideClose }) {
    const navigate = useNavigate();
    const [bellOpen, setBellOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    //const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    document.body.classList.add('light');

    return (
        <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xl px-6 py-2 flex justify-between items-center relative z-10">
            {sideClose ?
                <div onClick={handleClick} className='cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                </div> : ''}
            <h1 className="text-md font-extrabold tracking-wide">
                <img
                    src={logo}
                    alt="VHS Logo"
                    className="w-35"
                />
            </h1>

            <div className="relative">
                <div className="px-6 flex w-full justify-center flex-grow">
                    <div className="jaipur-ieeh">
                        <div className="TextField-root max-w-[350px]">
                            <div className="jaipur-mel">
                                <select
                                    onChange={(e) => {
                                        // You can handle the selected value here
                                        const value = e.target.value;
                                        console.log('Selected:', value);
                                        // update your state here if needed
                                    }}
                                    className="block w-30 p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="awb_number">AWB ID</option>
                                    <option value="order_id" selected>Order ID</option>
                                    <option value="ref_order_id">Ref. ID</option>
                                </select>

                                <input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Search Order by Order ID"
                                    name="globalOrderSearch"
                                    className="OutlinedInput block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/*New Code*/}
                <div className="relative flex">
                    <span className="dropdown-btn outline-btn1">
                        <a className="">
                            329.00
                        </a>
                    </span>
                    <span className="dropdown-btn outline-btn2">
                        <a className="">
                            Recharge
                        </a>
                    </span>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <span
                        onClick={() => setIsOpen(!isOpen)}
                        className="dropdown-btn flex items-center gap-2 p-2 rounded-full transition"
                    >Quick Actions <FaChevronDown fontSize={10} />
                    </span>

                    {isOpen && (
                        <div className="absolute right-0 mt-1 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50 dropdown-box">
                            <ul
                                className="drop-down-list"
                                role="menu"
                                tabIndex={-1}
                                style={{ paddingRight: 0, width: "calc(100% + 0px)" }}
                            >
                                <div className="tw-p-6" tabIndex={0}>
                                    <div className="tw-grid tw-gap-6">
                                        <div className="flex items-start gap-4 cursor-pointer list-item-section">
                                            <div className="root-icon">
                                                <img
                                                    alt="/images/svgs/icon-dd-mobile.svg"
                                                    loading="lazy"
                                                    width={24}
                                                    height={24}
                                                    src={icon_1} />
                                            </div>
                                            <div className="root-heading">
                                                <h6>
                                                    Rate Calculator
                                                </h6>
                                                <h6 className="tw-text-sm">
                                                    Calculate your shipping rate
                                                </h6>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 cursor-pointer list-item-section">
                                            <div className="root-icon">
                                                <img
                                                    alt="/images/svgs/icon-dd-mobile.svg"
                                                    loading="lazy"
                                                    width={24}
                                                    height={24}
                                                    src={icon_1} />
                                            </div>
                                            <div className="root-heading">
                                                <h6>
                                                    Rate Calculator
                                                </h6>
                                                <h6 className="tw-text-sm">
                                                    Calculate your shipping rate
                                                </h6>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 cursor-pointer list-item-section">
                                            <div className="root-icon">
                                                <img
                                                    alt="/images/svgs/icon-dd-mobile.svg"
                                                    loading="lazy"
                                                    width={24}
                                                    height={24}
                                                    src={icon_1} />
                                            </div>
                                            <div className="root-heading">
                                                <h6>
                                                    Rate Calculator
                                                </h6>
                                                <h6 className="tw-text-sm">
                                                    Calculate your shipping rate
                                                </h6>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 cursor-pointer list-item-section">
                                            <div className="root-icon">
                                                <img
                                                    alt="/images/svgs/icon-dd-mobile.svg"
                                                    loading="lazy"
                                                    width={24}
                                                    height={24}
                                                    src={icon_1} />
                                            </div>
                                            <div className="root-heading">
                                                <h6>
                                                    Rate Calculator
                                                </h6>
                                                <h6 className="tw-text-sm">
                                                    Calculate your shipping rate
                                                </h6>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 cursor-pointer list-item-section">
                                            <div className="root-icon">
                                                <img
                                                    alt="/images/svgs/icon-dd-mobile.svg"
                                                    loading="lazy"
                                                    width={24}
                                                    height={24}
                                                    src={icon_1} />
                                            </div>
                                            <div className="root-heading">
                                                <h6>
                                                    Rate Calculator
                                                </h6>
                                                <h6 className="tw-text-sm">
                                                    Calculate your shipping rate
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ul>

                        </div>
                    )}
                </div>

                <div className="relative">
                    <span className="ticket-btn">
                        <a className="">
                            Tickets
                        </a>
                    </span>
                </div>
                {/*New Code*/}

                <div className="relative">
                    <button
                        onClick={() => {
                            setDropdownOpen(false)
                            setBellOpen(!bellOpen)
                        }}
                        className="flex items-center gap-2 p-2 rounded-full hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-xl transition"
                    >
                        <FaBell className='rounded-full' />
                    </button>

                    {bellOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50">

                            {/* Options */}
                            <div className="space-y-2">
                                <div className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
                                    <div className="text-gray-800 text-[12px] font-medium">No Updtaed</div>
                                </div>


                            </div>


                        </div>
                    )}
                </div>


                <div className="relative">
                    <button
                        onClick={() => {
                            setDropdownOpen(!dropdownOpen)
                            setBellOpen(false)
                        }}
                        className="flex items-center gap-2 p-2 rounded-full hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        <img
                            src="https://i.pravatar.cc/100"
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full"
                        />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-1 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50">
                            {/* User Info */}
                            <div className="flex items-center gap-4 mb-4 cursor-pointer" onClick={() => {
                                navigate('/profile')
                                setDropdownOpen(false)
                            }}>
                                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
                                    👤
                                </div>
                                <div>
                                    <h2 className="text-[12px] font-semibold">Jhon Doe</h2>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">ADMIN</p>
                                    <p className="text-[10px]"><i class="fa fa-envelope"></i>  jaipurlogisticintl@gmail.com</p>
                                    <p className="text-[10px]"> <i className="fa fa-phone" />  9799242824</p>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="space-y-2">
                                <div className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
                                    <div className="text-gray-800 text-[12px] font-medium">My Profile</div>
                                    <div className="text-[12px] text-gray-500">Account Settings</div>
                                </div>
                                <div className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
                                    <div className='text-gray-800 text-[12px] font-medium'>Support</div>
                                    <div className="text-[12px] text-gray-500">Contact Support</div>
                                </div>
                                <div className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
                                    <div className='text-gray-800 text-[12px] font-medium'>Terms & Conditions / SOP</div>
                                    <div className="text-[12px] text-gray-500">Read Our Terms & Conditions</div>
                                </div>
                                <div className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
                                    <div className='text-gray-800 text-[12px] font-medium'>API Documentation</div>
                                    <div className="text-[12px] text-gray-500">Check our latest API Documentation</div>
                                </div>
                            </div>

                            {/* Logout */}
                            <div
                                onClick={() => navigate('/login')}
                                className="mt-4 w-full text-center py-2 border-t border-gray-200 dark:border-gray-600 pt-3 text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                            >
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
