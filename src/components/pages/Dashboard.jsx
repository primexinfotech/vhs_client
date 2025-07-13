import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './Dashboard.css';

// Image assets (ensure these paths are correct)
import newOrderIcon from '../../assets/box-icon-1.svg';
import courierIcon from '../../assets/box-icon-2.svg';
import scheduledIcon from '../../assets/box-icon-3.svg';
import profileIcon from '../../assets/box-icon-4.svg';
import returnIcon from '../../assets/box-icon-5.svg';
import rtoIcon from '../../assets/box-icon-6.svg';

const Dashboard = () => {

    const dashboardLinks = [
        { title: "New Order", quantity: '30', link: "/Customer/CreateShipment", boxClass: "blue" },
        { title: "Courier Assigned", quantity: '30', link: "/Customer/ShipmentTracking", boxClass: "green" },
        { title: "Scheduled", quantity: '30', link: "/Customer/ShipmentHistory", boxClass: "yellow" },
        { title: "All Order", quantity: '30', link: "/Customer/MyProfile", boxClass: "purple" },
        { title: "Customer Returns", quantity: '30', link: "/Customer/RaiseQuery", boxClass: "pink" },
        { title: "RTO", quantity: '30', link: "/Customer/ShipmentCancellation", boxClass: "red" },
    ];

    const boxStyles = [
        "bg-blue-50", "bg-green-50", "bg-yellow-50",
        "bg-purple-50", "bg-pink-50", "bg-red-50"
    ];

    const imageMap = {
        "New Order": newOrderIcon,
        "Courier Assigned": courierIcon,
        "Scheduled": scheduledIcon,
        "All Order": profileIcon,
        "Customer Returns": returnIcon,
        "RTO": rtoIcon
    };

    useEffect(() => {
        document.title = 'VHS : Dashboard'
    }, []);

    return (
        <div className="bg-white py-8 px-2 rounded-xl shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-2">
                {dashboardLinks.map((item, idx) => (
                    <Link to={item.link} key={idx} className="block h-full">
                        <div className={`bg-${item.boxClass}-50 border border-gray-200 rounded-xl px-4 py-3 h-full transition flex flex-col items-center text-center`}>
                            <img src={imageMap[item.title]} alt={item.title} className="w-12 h-12 mb-2" />
                            <h6 className="text-[12px] font-medium">{item.title}</h6>
                            {item.quantity && <p className="text-[12px] text-gray-500">{item.quantity}</p>}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Wallet Transactions */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2 mt-3">
                <div className="bg-white-50 border border-gray-200 rounded-xl p-4 h-full shadow-md hover:shadow-lg transition flex flex-col">
                    <div className='text-[12px] font-medium'>Wallet Transactions</div>
                    <div className="space-y-4 px-1 py-4 bg-white">
                        {[1, 2, 3, 4, 5, 6].map((item, index) => (
                            <div key={index} className="flex items-start space-x-2">
                                <div className="p-2 bg-blue-100 rounded-full">
                                    <img src="https://img.icons8.com/ios-filled/24/000000/money-transfer.png" alt="icon" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-[12px] font-semibold text-gray-800">Order Shipping amount Deducted</div>
                                    <div className="text-[12px] text-gray-500">28 May 2025, 02:57 PM</div>
                                </div>
                                <div className="text-[12px] text-red-500 font-semibold">- 1771.18 INR</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Placeholder Widget */}
                <div className="bg-white-50 border border-gray-200 rounded-xl p-4 h-full shadow-md hover:shadow-lg transition flex flex-col items-center text-center">
                    {/* Reserved for chart, summary, or campaign data */}
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="w-full gap-2 mt-3">
                <div className="bg-white border border-gray-200 rounded-xl py-2 shadow-md hover:shadow-lg transition flex flex-col">
                    <div className="text-sm font-semibold mb-4 text-gray-800 px-3">Recent Orders</div>
                    <hr />
                    <div className="overflow-x-auto mt-2 px-2">
                        <table className="min-w-[640px] w-full table-auto text-sm text-left text-gray-700 border-collapse">
                            <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-200">Customer</th>
                                    <th className="px-6 py-3 border-b border-gray-200">Product</th>
                                    <th className="px-6 py-3 border-b border-gray-200">Order ID</th>
                                    <th className="px-6 py-3 border-b border-gray-200">Type</th>
                                    <th className="px-6 py-3 border-b border-gray-200">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
                                        <td className="px-6 py-4 border-b border-gray-200 font-medium text-gray-800">Amarpreet Kaur</td>
                                        <td className="px-6 py-4 border-b border-gray-200">100% COTTON WOMEN DRESS</td>
                                        <td className="px-6 py-4 border-b text-cyan-800 font-medium cursor-pointer border-gray-200">23537SM4284156859</td>
                                        <td className="px-6 py-4 border-b border-gray-200">
                                            <span className="inline-block bg-blue-100 text-white-800 text-xs px-2 py-1 rounded-full">Forward</span>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-200">
                                            <span className="inline-block bg-green-100 text-white-800 text-xs px-2 py-1 rounded-full">Schedule</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
