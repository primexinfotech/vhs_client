import React, { useState } from "react";
import { FaCheckCircle, FaPencilAlt, FaWallet } from "react-icons/fa";

export default function ProfilePage() {
    const [image, setImage] = useState(null);
    const [activeTab, setActiveTab] = useState("profile");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-r from-green-100 to-purple-200 rounded-2xl p-6 shadow-lg w-full">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Wallet */}
                    <div className="text-center">
                        <div><FaWallet className='text-[12px]' /></div>
                        <div className="text-[12px] font-bold text-gray-800">₹ 333.16</div>
                        <div className="text-[12px] text-gray-600">Wallet</div>
                    </div>

                    {/* Profile Image */}
                    <div className="flex flex-col items-center">
                        <div className="relative inline-block">
                            {/* Profile Circle */}
                            <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-md">
                                {image ? (
                                    <img src={image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Upload Icon Outside the Circle */}
                            <label className="absolute -bottom-1 right-6 bg-white p-1 rounded-full cursor-pointer shadow hover:bg-gray-100">
                                <FaPencilAlt size={15} />
                                <input type="file" className="hidden" onChange={handleImageUpload} />
                            </label>
                        </div>

                        <div className="mt-2 text-xl font-bold">ANAVIL</div>
                        <div className="text-sm text-gray-500">ADMIN</div>
                    </div>

                    {/* Profile Status */}
                    <div className="flex items-center space-x-2 text-center">
                        <span className="font-medium text-gray-700">Profile Status:</span>
                        <span className="flex items-center text-green-600 font-semibold">
                            <FaCheckCircle className="w-5 h-5 mr-1" /> Approved
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-8">
                    <div className="flex space-x-4 border-b border-gray-300">
                        {["profile", "documents", "password"].map((tab) => (
                            <button
                                key={tab}
                                className={`py-3 px-5 text-sm font-semibold transition-colors duration-200 ${activeTab === tab
                                    ? "border-b-2 border-black text-black"
                                    : "text-gray-500 hover:text-black"
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === "profile" && "My Profile"}
                                {tab === "documents" && "Documents"}
                                {tab === "password" && "Change Password"}
                            </button>
                        ))}
                    </div>

                    {/* Tab Contents */}
                    <div className="mt-4 bg-white rounded-xl shadow-xl p-6">
                        {activeTab === "profile" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                                <div>
                                    <div className="font-medium">Name:</div>
                                    <div>ANAVIL</div>
                                </div>
                                <div>
                                    <div className="font-medium">Phone:</div>
                                    <div>
                                        9799242824{" "}
                                        <FaCheckCircle className="inline w-4 h-4 text-green-500 ml-1" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">Email:</div>
                                    <div className="flex items-center space-x-2">
                                        <span>jaipurlogisticintl@gmail.com</span>
                                        <button className="text-sm border px-2 py-1 rounded hover:bg-gray-100 transition">
                                            Verify
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">User type:</div>
                                    <div>BUSINESS</div>
                                </div>
                                <div>
                                    <div className="font-medium">Joined:</div>
                                    <div>4 Mar 2025, 02:46 PM</div>
                                </div>
                            </div>
                        )}

                        {activeTab === "documents" && (
                            <div className="text-gray-600">Upload Documents Tab</div>
                        )}

                        {activeTab === "password" && (
                            <div className="text-gray-600">Change Password Form</div>
                        )}
                    </div>
                </div>

                {/* Extra Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="font-semibold text-lg text-gray-800 mb-2">KYC using Aadhaar</div>
                        <div className="text-gray-700">
                            KYC Status:{" "}
                            <span className="text-green-600 font-semibold">Verified</span>
                        </div>
                        <div className="text-sm text-gray-500">Verified at: 5 Mar 2025</div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="font-semibold text-lg text-gray-800 mb-2">API Details</div>
                        <div className="text-gray-600">API integration and token data...</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
