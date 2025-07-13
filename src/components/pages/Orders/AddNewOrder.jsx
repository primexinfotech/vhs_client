import { useRef } from "react";
import { useState } from "react";
import { FaSave, FaTruck, FaTrashAlt, FaPlus } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { InputBox, ReactSelectSearch } from "../../Common/FormInputs";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const AddNewOrder = () => {
    const navigate = useNavigate();

    const inputrefs = useRef([]);

    const [quantity, setQuantity] = useState(1);

    const [showOptional, setShowOptional] = useState(true);
    const [isSameAsBilling, setIsSameAsBilling] = useState(true);
    const [selected, setSelected] = useState("Domestic");
    const [OpenAddAddress, setOpenAddAddress] = useState(false)
    const [formData, setFormData] = useState({
        buyerName: "",
        phoneNumber: "",
        alternativePhone: ""
    })

    return (
        <>
            <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                {/* Left Section */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
                    <IoIosArrowBack className="text-[15px] text-gray-500" />
                    <h2 className="text-[12px] font-medium text-gray-800">Add Order</h2>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-sm text-[10px] font-medium hover:bg-blue-200 transition cursor-pointer">
                        Dismiss
                    </button>
                    <button className="bg-cyan-600 text-white px-3 py-1 rounded-sm text-[10px] font-medium flex items-center gap-2 hover:bg-cyan-700 transition cursor-pointer">
                        <FaSave className="text-sm" />
                        Save
                    </button>
                    <button className="bg-gray-800 text-white px-3 py-1 rounded-sm text-[10px] font-medium flex items-center gap-2 hover:bg-gray-900 transition cursor-pointer">
                        <FaTruck className="text-sm" />
                        Save & Assign Courier
                    </button>
                </div>
            </div>

            <div className="mt-2 inline-flex items-center p-1 rounded-full bg-white border border-gray-300 shadow-sm">
                <button
                    onClick={() => {
                        setSelected("Domestic")
                    }}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${selected === "Domestic"
                        ? "bg-cyan-700 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                >
                    Domestic
                </button>
                <button
                    onClick={() => {
                        setSelected("International")
                    }}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${selected === "International"
                        ? "bg-cyan-700 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                >
                    International
                </button>
            </div>

            <div className="bg-white  rounded-md shadow-md border border-gray-300 mt-2">
                <div className="bg-cyan-700 text-white px-4 py-2 rounded-t-md flex items-center gap-2">
                    <h2 className="font-semibold text-[15px]">Buyer/Receiver Details</h2>
                </div>

                <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">

                    {selected === "International" &&
                        <>
                            <ReactSelectSearch
                                id="txtCountry"
                                label='Search Country'
                                onFocus={(e) => e.target.select()}
                                inputrefs={inputrefs}
                                value={formData.country}
                                options={[]}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, country: e }))
                                }}
                                required
                            />

                            <ReactSelectSearch
                                id="txtState"
                                label='Search State'
                                onFocus={(e) => e.target.select()}
                                inputrefs={inputrefs}
                                value={formData.state}
                                options={[]}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, state: e }))
                                }}

                            />

                            <InputBox
                                label='City'
                                inputrefs={inputrefs}
                                id='txtCity'
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        inputrefs.current['txtActive'].focus()
                                    }
                                }}
                                maxLength="100"
                                required={true}
                            />

                            <InputBox
                                label='Pincode'
                                inputrefs={inputrefs}
                                id='txtPincode'
                                value={formData.pincode}
                                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        inputrefs.current['txtActive'].focus()
                                    }
                                }}
                                maxLength="50"
                                required={true}
                            />

                            <InputBox
                                label='Address Line 1'
                                inputrefs={inputrefs}
                                id='txtAddressLine1'
                                value={formData.addressLine1}
                                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        inputrefs.current['txtActive'].focus()
                                    }
                                }}
                                maxLength="100"
                                required={true}
                            />

                            <InputBox
                                label='Address Line 2'
                                inputrefs={inputrefs}
                                id='txtAddressLine2'
                                value={formData.addressLine2}
                                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        inputrefs.current['txtActive'].focus()
                                    }
                                }}
                                maxLength="100"
                                required={true}
                            />


                        </>}

                    <InputBox
                        label='Buyer Name'
                        inputrefs={inputrefs}
                        id='txtBuyerName'
                        value={formData.buyerName}
                        onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="60"
                        required={true}
                    />

                    <InputBox
                        label='Phone'
                        inputrefs={inputrefs}
                        id='txtPhone'
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="10"
                        required={true}
                    />


                    <InputBox
                        label='Alternative phone'
                        inputrefs={inputrefs}
                        id='txtAlternativePhone'
                        value={formData.alternativePhone}
                        onChange={(e) => setFormData({ ...formData, alternativePhone: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="10"
                        required={true}
                    />

                    <InputBox
                        label='Email ID'
                        inputrefs={inputrefs}
                        id='txtEmailID'
                        value={formData.emailID}
                        onChange={(e) => setFormData({ ...formData, emailID: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="10"
                        required={true}
                    />

                    {selected === "International" &&
                        <>
                            <InputBox
                                label='Buyer Company Name'
                                inputrefs={inputrefs}
                                id='txtBuyerCompanyName'
                                value={formData.buyerCompanyName}
                                onChange={(e) => setFormData({ ...formData, buyerCompanyName: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        inputrefs.current['txtActive'].focus()
                                    }
                                }}
                                maxLength="60"
                            />

                            <InputBox
                                label='TAXID'
                                inputrefs={inputrefs}
                                id='txtTAXID'
                                value={formData.taxID}
                                onChange={(e) => setFormData({ ...formData, taxID: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        inputrefs.current['txtActive'].focus()
                                    }
                                }}
                                maxLength="60"
                            />
                        </>
                    }

                    {selected !== "International" &&
                        <>
                            <InputBox
                                label='GSTIN'
                                inputrefs={inputrefs}
                                id='txtGSTIN'
                                value={formData.gstin}
                                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        inputrefs.current['txtActive'].focus()
                                    }
                                }}
                                maxLength="10"
                                required={true}
                            />

                            <InputBox
                                label='Address Line 1'
                                inputrefs={inputrefs}
                                id='txtAddressLine1'
                                value={formData.addressLine1}
                                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        inputrefs.current['txtActive'].focus()
                                    }
                                }}
                                maxLength="100"
                                required={true}
                            />

                            <InputBox
                                label='Address Line 2'
                                inputrefs={inputrefs}
                                id='txtAddressLine2'
                                value={formData.addressLine2}
                                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        inputrefs.current['txtActive'].focus()
                                    }
                                }}
                                maxLength="100"
                                required={true}
                            />




                            <InputBox
                                label='Pincode'
                                inputrefs={inputrefs}
                                id='txtPincode'
                                value={formData.pincode}
                                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        inputrefs.current['txtActive'].focus()
                                    }
                                }}
                                maxLength="10"
                                required={true}
                            />

                            <InputBox
                                label='City'
                                inputrefs={inputrefs}
                                id='txtCity'
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        inputrefs.current['txtActive'].focus()
                                    }
                                }}
                                maxLength="10"
                                disabled={true}
                                required={true}
                            />

                            <InputBox
                                label='State'
                                inputrefs={inputrefs}
                                id='txtState'
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        inputrefs.current['txtActive'].focus()
                                    }
                                }}
                                maxLength="10"
                                disabled={true}
                                required={true}
                            />
                        </>
                    }
                </div>

                {selected !== "International" && <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-1">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isSameAsBilling}
                            onChange={(e) => setIsSameAsBilling(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <label className="text-[10px]">Buyer/Receiver details same as Billing details</label>
                    </div>
                </div>}
            </div>

            <div className=" bg-white rounded-md shadow-md border border-gray-300 mt-2">
                <div className="bg-cyan-700 text-white px-4 py-2 rounded-t-md flex items-center gap-2">
                    <h2 className="font-semibold text-[15px]">Order Details</h2>
                </div>

                <div className="p-2 grid lg:grid-cols-3 gap-2">
                    <InputBox
                        label='Order ID'
                        inputrefs={inputrefs}
                        id='txtOrderID'
                        value={formData.orderID}
                        onChange={(e) => setFormData({ ...formData, orderID: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="10"
                        required={true}
                    />

                    <InputBox
                        label='Reference ID'
                        inputrefs={inputrefs}
                        id='txtReferenceID'
                        value={formData.referenceID}
                        onChange={(e) => setFormData({ ...formData, referenceID: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="10"
                        required={true}
                    />

                </div>


                {/* ---------------------- Product Details Section Start ----------------- */}
                <div className="py-5 px-2">

                    <div className="relative border border-dashed border-gray-300 rounded-xl p-4 mb-6 bg-white shadow-sm">

                        {/* Top Step Number Badge */}
                        <span className="cursor-pointer absolute -top-4 left-1/2 transform -translate-x-1/2 bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-[12px] font-bold">
                            1
                        </span>

                        {/* Bottom Step Number Badge */}
                        <span className="cursor-pointer absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-[12px] font-bold">
                            <FaPlus />
                        </span>

                        {/* Delete Button */}
                        <button className="cursor-pointer absolute -top-4 right-4 bg-red-100 text-red-600 rounded-full p-2 hover:bg-red-200 transition">
                            <FaTrashAlt />
                        </button>

                        {/* Main Fields */}
                        <div className="grid grid-cols-4 gap-4">
                            {/* Product Name */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium mb-1">
                                    Product Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter name or search"
                                    className="border border-gray-400 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* HSN */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium mb-1">HSN</label>
                                <input
                                    type="text"
                                    placeholder="HSN"
                                    className="border border-gray-400 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Quantity */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium mb-1">
                                    Quantity <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden w-fit">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-10 h-7 bg-gray-100 hover:bg-gray-200 text-lg font-bold cursor-pointer"
                                    >
                                        −
                                    </button>
                                    <span className="px-4 text-sm w-[100px] text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-10 h-7 bg-gray-100 hover:bg-gray-200 text-lg font-bold cursor-pointer"
                                    >
                                        +
                                    </button>

                                </div>
                            </div>

                            {/* Unit Price */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium mb-1">
                                    Unit Price <span className="text-red-500">*</span>
                                </label>
                                <div className="flex border border-gray-400 rounded-lg overflow-hidden">
                                    <span className="bg-gray-100 px-3 py-1 text-sm flex items-center">₹</span>
                                    <input
                                        type="text"
                                        placeholder="Unit Price"
                                        className="w-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Optional Toggle */}
                        <div
                            className="mt-2 text-[12px] text-cyan-600 flex items-center gap-1"
                        >
                            <span onClick={() => setShowOptional(!showOptional)} className=" cursor-pointer hover:underline">+ Add Category, SKU, Discount and Tax</span>
                            <span className="text-gray-400">(optional)</span>
                        </div>

                        {/* Optional Fields */}
                        {showOptional && (
                            <div className="grid grid-cols-4 gap-4 mt-4">
                                {/* Product Category */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium mb-1">Product Category</label>
                                    <input
                                        type="text"
                                        placeholder="Product Category"
                                        className="border border-gray-400 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* SKU */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium mb-1">SKU</label>
                                    <input
                                        type="text"
                                        placeholder="Enter sku"
                                        className="border border-gray-400 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Discount */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium mb-1">Discount</label>
                                    <div className="flex border border-gray-400 rounded-lg overflow-hidden">
                                        <span className="bg-gray-100 px-3 py-1 text-sm flex items-center">₹</span>
                                        <input
                                            type="text"
                                            placeholder="Discount"
                                            className="w-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Tax */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium mb-1">Tax</label>
                                    <div className="flex border border-gray-400 rounded-lg overflow-hidden">
                                        <span className="bg-gray-100 px-3 py-1 text-sm flex items-center">₹</span>
                                        <input
                                            type="text"
                                            placeholder="Tax"
                                            className="w-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* ---------------------- Product Details Section End ----------------- */}

            </div>

            <div className=" bg-white rounded-md shadow-md border border-gray-300 mt-2">
                <div className="bg-cyan-700 text-white px-4 py-2 rounded-t-md flex items-center gap-2">
                    <h2 className="font-semibold text-[15px]">Warehouse/Pickup Address</h2>
                </div>

                <div className="p-2 grid lg:grid-cols-3 gap-2">
                    <ReactSelectSearch
                        id="txtPackageType"
                        label='Search and select your warehouse'
                        onFocus={(e) => e.target.select()}
                        inputrefs={inputrefs}
                        value={formData.selecedAddress}
                        options={[]}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, selecedAddress: e }))
                        }}
                        required
                    />

                    <div className='mt-5'>
                        <button onClick={() => setOpenAddAddress(true)} className="bg-cyan-700 text-white text-[10px] font-semibold py-1.5 px-2 rounded-md hover:bg-cyan-800 transition cursor-pointer">
                            Add Address
                        </button>
                    </div>
                </div>

            </div>

            <div className="bg-white rounded-md shadow-md border border-gray-300 mt-2">
                <div className="bg-cyan-700 text-white px-4 py-2 rounded-t-md flex items-center gap-2">
                    <h2 className="font-semibold text-[15px]">Weight & Dimesions</h2>
                </div>

                <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">

                    <ReactSelectSearch
                        id="txtPackageType"
                        label='Package Type'
                        onFocus={(e) => e.target.select()}
                        inputrefs={inputrefs}
                        value={formData.packageType}
                        options={[]}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, packageType: e }))
                        }}
                        required
                    />

                    <InputBox
                        label='Total Weight of Order'
                        inputrefs={inputrefs}
                        id='txtTotalWeightOfOrder'
                        value={formData.totalWeightOfOrder}
                        onChange={(e) => setFormData({ ...formData, totalWeightOfOrder: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="10"
                        showIconTextEnd={true}
                        endTextIcon='Kg'
                        required={true}
                    />

                </div>

                <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    <InputBox
                        label='Length '
                        inputrefs={inputrefs}
                        id='txtLength'
                        value={formData.length}
                        onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="60"
                        showIconTextEnd={true}
                        endTextIcon='CM'
                        required={true}
                    />

                    <InputBox
                        label='Width '
                        inputrefs={inputrefs}
                        id='txtWidth'
                        value={formData.width}
                        onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="60"
                        showIconTextEnd={true}
                        endTextIcon='CM'
                        required={true}
                    />


                    <InputBox
                        label='Height '
                        inputrefs={inputrefs}
                        id='txtHeight'
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="60"
                        showIconTextEnd={true}
                        endTextIcon='CM'
                        required={true}
                    />
                </div>
            </div>

            <div className="bg-white rounded-md shadow-md border border-gray-300 mt-2">
                <div className="bg-cyan-700 text-white px-4 py-2 rounded-t-md flex items-center gap-2">
                    <h2 className="font-semibold text-[15px]">Other Details</h2>
                </div>

                <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">

                    <InputBox
                        label='Reseller Name'
                        inputrefs={inputrefs}
                        id='txtReSellerName'
                        value={formData.resllerName}
                        onChange={(e) => setFormData({ ...formData, resllerName: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="60"
                        required={true}
                    />

                    <InputBox
                        label='GSTIN'
                        inputrefs={inputrefs}
                        id='txtGSTIN'
                        value={formData.gstin}
                        onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="10"
                        required={true}
                    />


                    <InputBox
                        label='GST Ewaybill Number'
                        inputrefs={inputrefs}
                        id='txtGSTEwaybillNumber'
                        value={formData.gstEwaybillNo}
                        onChange={(e) => setFormData({ ...formData, gstEwaybillNo: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="10"
                        required={true}
                    />

                </div>
            </div>

            <div className="mt-3 flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-sm text-[10px] font-medium hover:bg-blue-200 transition cursor-pointer">
                        Dismiss
                    </button>
                    <button className="bg-cyan-600 text-white px-3 py-1 rounded-sm text-[10px] font-medium flex items-center gap-2 hover:bg-cyan-700 transition cursor-pointer">
                        <FaSave className="text-sm" />
                        Save
                    </button>
                    <button className="bg-gray-800 text-white px-3 py-1 rounded-sm text-[10px] font-medium flex items-center gap-2 hover:bg-gray-900 transition cursor-pointer">
                        <FaTruck className="text-sm" />
                        Save & Assign Courier
                    </button>
                </div>
            </div>

            <Dialog
                open={OpenAddAddress}
                onClose={() => setOpenAddAddress(false)}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle id="scroll-dialog-title">Add Warehouse</DialogTitle>
                <DialogContent dividers>
                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                            <label className="font-medium">
                                Address Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Address title"
                                className="w-full border rounded-md px-4 py-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border rounded-md px-4 py-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 border border-r-0 rounded-l-md bg-gray-100 text-sm text-gray-700">
                                    +91
                                </span>
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    className="w-full border rounded-r-md px-4 py-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-medium">Alternative phone</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 border border-r-0 rounded-l-md bg-gray-100 text-sm text-gray-700">
                                    +91
                                </span>
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    className="w-full border rounded-r-md px-4 py-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-medium">
                                Email ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border rounded-md px-4 py-2 mt-1"
                            />
                        </div>

                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="font-medium">
                                Address Line 1 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Flat, House No. Building, Apartment"
                                className="w-full border rounded-md px-4 py-2 mt-1"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Only these special characters are allowed <span className="text-red-500">. , - / #</span>
                            </p>
                        </div>

                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="font-medium">Address Line 2</label>
                            <input
                                type="text"
                                placeholder="Area, Colony, Street No., Sector"
                                className="w-full border rounded-md px-4 py-2 mt-1"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Only these special characters are allowed <span className="text-red-500">. , - / #</span>
                            </p>
                        </div>

                        <div>
                            <label className="font-medium">
                                Pincode <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-4 py-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-4 py-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                State <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-4 py-2 mt-1"
                            />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setOpenAddAddress(false)}
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button className="px-4 py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-800">
                        Save
                    </button>
                </DialogActions>
            </Dialog>

        </>
    )
}
export default AddNewOrder;