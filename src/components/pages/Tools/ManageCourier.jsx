import React, { useState } from "react";
import { TopTabs } from "../../Common/TopTabs";
import {
    FaCalculator,
    FaList,
    FaChartLine,
    FaTruck,
    FaDownload,
    FaRupeeSign,
    FaSync
} from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const tableData = [
    { courier: "Delhivery Surface 5KG" },
    { courier: "Delhivery Surface 10Kg" },
    { courier: "Delhivery Surface 0.5Kg" },
    { courier: "Delhivery Air" },
    { courier: "BlueDart Surface 0.5 Kg" },
    { courier: "Ecom Express 0.5KG" },
    { courier: "Delhivery 1Kg" },
    { courier: "Delhivery 2Kg" },
];

export default function ManageCourier() {
    const [activeTab, setActiveTab] = useState('Courier Manage');
    const tabs = [
        { name: 'Rate Calculator', icon: <FaCalculator />, link: '/tools/rate-calculator' },
        { name: 'Shipment Price List', icon: <FaList />, link: '' },
        { name: 'Activity Logs', icon: <FaChartLine />, link: '' },
        { name: 'Courier Manage', icon: <FaTruck />, link: '/tools/manage-courier' },
        { name: 'tableData Download', icon: <FaDownload />, link: '/tools/report-table' }
    ];
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <>
            <TopTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="p-6 mt-3 bg-white rounded-xl shadow-md">
                {/* Date Range Header */}
                <div className='flex justify-between'>
                    <div className="flex items-center border rounded-md overflow-hidden w-[270px] h-[30px] shadow-sm mb-3">
                        <div className="bg-gray-100 px-3 py-2 flex items-center">
                            <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <DatePicker
                            selected={startDate}
                            onChange={(dates) => {
                                const [start, end] = dates;
                                setStartDate(start);
                                setEndDate(end);
                            }}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            dateFormat="dd-MM-yyyy"
                            placeholderText="dd-mm-yyyy to dd-mm-yyyy"
                            className="px-4 py-2 w-[250px] focus:outline-none"
                        />
                    </div>
                    <div>
                        <button title='Refresh' className="bg-gray-500 cursor-pointer text-white px-2 py-2 rounded-md hover:bg-gray-600">
                            <FaSync />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-100 text-gray-700 text-sm">
                            <tr>
                                <th className="px-4 py-3">Sr. No.</th>
                                <th className="px-4 py-3">Courier</th>
                                <th className="px-4 py-3">Serviceable Pincodes</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((report, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{report.courier}</td>
                                    <td className="px-4 py-3">
                                        <button className="bg-cyan-700 cursor-pointer text-white px-4 py-1 rounded-md hover:bg-cyan-800">
                                            Download
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button className="bg-cyan-700 cursor-pointer text-white px-4 py-1 rounded-md hover:bg-cyan-800">
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
