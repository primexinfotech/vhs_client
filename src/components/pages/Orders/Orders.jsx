import React, { useEffect } from 'react';
import { FaSyncAlt, FaPlus } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import MainTable from '../../Common/MainTable';

export default function Orders() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title='ORDERS'
    },[])
    return (
        <div className="min-h-screen font-sans text-[14px] text-[#111827]">
            <div className="flex justify-between items-center p-2 bg-[#f7f8fb]">
                {/* Left section: Tabs + Toggle */}
                <div className="flex items-center gap-6">
                    {/* Tabs */}
                    <div className="flex gap-6 text-[10px] font-medium">
                        <div className="text-[#00789c] border-b-2 border-[#00789c] pb-1 cursor-pointer">
                            Forward
                        </div>
                        <div className="text-gray-800 border-b-2 border-gray-200 pb-1 cursor-pointer">
                            Reverse
                        </div>
                    </div>

                    {/* Toggle */}
                    <div className="flex bg-white border border-gray-200 rounded-full overflow-hidden text-[10px] font-semibold shadow-sm">
                        <button className="bg-[#00789c] text-white px-2 py-1 rounded-full">
                            Domestic
                        </button>
                        <button className="text-gray-800 px-2 py-1">International</button>
                    </div>
                </div>

                {/* Right section: Buttons */}
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-[#3e4265] text-white text-[10px] font-medium px-2 py-1 rounded-full shadow cursor-pointer">
                        <FaSyncAlt />
                        Sync Orders
                    </button>
                    <button className="bg-[#00789c] text-white text-[10px] font-medium px-2 py-1 rounded-full shadow cursor-pointer">
                        Bulk Import
                    </button>
                    <button onClick={() => navigate('/order/add-order')} className="flex items-center gap-2 bg-[#00789c] text-white text-[10px] font-medium px-2 py-1 rounded-full shadow cursor-pointer">
                        <FaPlus className="bg-white text-[#00789c] rounded-full p-0.5 text-xs" />
                        Add Order
                    </button>
                    <button className="bg-[#00789c] text-white p-1 text-[10px] rounded-full shadow cursor-pointer">
                        <IoChevronDown />
                    </button>
                </div>
            </div>

            {/* Shipment Type Buttons */}
            <div className="flex justify-between items-center my-4 flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                    <button className="bg-[#0284c7] text-white text-[10px] px-2 rounded font-medium">New</button>
                    <button className="bg-white text-[#374151] text-[10px] border px-2 py-1.5 rounded">Courier Assigned</button>
                    <button className="bg-white text-[#374151] text-[10px] border px-4 py-1.5 rounded">Pickups & Manifests</button>
                    <button className="bg-white text-[#374151]  text-[10px] border px-2 py-0.1 rounded">In Transit</button>
                    <button className="bg-white text-[#374151]  text-[10px] border px-2 py-0.1 rounded">Out For Delivery</button>
                    <button className="bg-white text-[#374151]  text-[10px] border px-2 py-0.1 rounded">Delivered</button>
                    <button className="bg-white text-[#374151]  text-[10px] border px-2 py-0.1 rounded">NDR</button>
                    <button className="bg-white text-[#374151]  text-[10px] border px-2 py-0.1 rounded">RTO</button>
                    <button className="bg-white text-[#374151]  text-[10px] border px-2 py-0.1 rounded">All</button>
                    <button className="bg-white text-[#374151]  text-[10px] border px-2 py-0.1 rounded">Archive</button>
                </div>


            </div>

            <MainTable />
        </div>
    );
}