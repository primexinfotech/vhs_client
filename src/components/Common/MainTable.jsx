
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MainTable = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    return (
        <>
            <div className="p-4 mt-3 bg-white rounded-xl shadow-md">
                {/* Filters */}
                <div className="p-1 rounded flex flex-wrap items-center gap-3">
                    <div className="flex items-center border rounded-md overflow-hidden w-[250px] h-[30px] shadow-sm">
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
                            className="px-2 py-2 w-[250px] focus:outline-none"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by reference"
                        className="border rounded-md shadow-sm px-2 py-1 w-[200px] h-[30px] text-gray-700"
                    />
                    <select className="border rounded-md shadow-sm px-2 py-1 w-[200px] h-[30px] text-gray-700">
                        <option>Payment type</option>
                    </select>
                    <select className="border rounded-md shadow-sm px-2 py-1 w-[200px] h-[30px] text-gray-700">
                        <option>Channels</option>
                    </select>
                    <button className="border rounded-md shadow-sm px-2 py-1 h-[30px] text-[#374151] bg-[#f3f4f6] hover:bg-[#e5e7eb]">More Filters</button>
                </div>

                {/* Table */}
                <div className="mt-6">
                    <div className="overflow-x-auto border rounded">
                        <table className="min-w-full text-left">
                            <thead className="bg-[#f3f4f6] text-[#4b5563]">
                                <tr>
                                    <th className="p-2"><input type="checkbox" /></th>
                                    <th className="p-2">Order Date</th>
                                    <th className="p-2">Order Details</th>
                                    <th className="p-2">Product Details</th>
                                    <th className="p-2">Package Details</th>
                                    <th className="p-2">Payment</th>
                                    <th className="p-2">Shipping Details</th>
                                    <th className="p-2">Pickup Address</th>
                                    <th className="p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="9" className="text-center py-12 text-gray-400">
                                        <div className="flex flex-col items-center">
                                            <div className="text-5xl mb-2">📄</div>
                                            <div>No data available for the applied filters.</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MainTable