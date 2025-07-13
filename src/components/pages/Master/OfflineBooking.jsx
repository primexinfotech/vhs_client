import { useEffect, useRef, useState } from "react";
import { CustomButton, InputBox, ReactSelectSearch, Switch, TextAreaBox } from "../../Common/FormInputs";
import { Table } from "../../Common/Table";
import { ApiCall, ConfirmAlertBox, NotificationSound, setFocus } from "../../Common/Method";
import { setGlobalLoader } from "../../../Redux/authSlice";
import { useDispatch } from "react-redux";
import { convertTwoDecimalsOnValue } from "../../EnvConfig/EnvConfig";

const OfflineBooking = () => {
    const inputrefs = useRef([]);
    const dispatch = useDispatch()
    const [tableLoading, setTableLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [sortConfig, setSortConfig] = useState({ sortColumn: null, sortOrder: null });
    const [pageSize, setPageSize] = useState("10");
    const [filterData, setFilterData] = useState({
        type: "S",
        searchText: "",
        searchFieldValue: "",
        startValue: "",
        AdvanceFilter: []
    });
    const options = ["Economy", "Standard", "Premium"];

    const initialState = {
        enteredDetails: "",
        name: "",
        mobileNo: "",
        addressLine1: "",
        addressLine2: "",
        pincode: "",
        bookingType: "Economy"
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange1 = (event, pagenumber) => {
        setCurrentPageNo(pagenumber);
    };

    const handleSorting = (sortColumn) => {
        let sortOrder = 'ASC';
        if (sortConfig && sortConfig.sortColumn === sortColumn && sortConfig.sortOrder === 'ASC') {
            sortOrder = 'DESC';
        }
        setSortConfig({ sortColumn, sortOrder });
    };

    const showGridData = async () => {
        let request = {
            ...sortConfig,
            pageIndex: `${currentPageNo}`,
            pageSize: pageSize,
            AdvanceFilter: [{
                "SearchingValue": filterData.searchFieldValue,
                "ComparisonType": filterData.startValue,
                "SearchingText": filterData.searchText,
                "SearchingText1": '',
            }],
        };
        setTableLoading(true);
        let response = await ApiCall(`/api/Master/ShowOfflineBooking`, { ...request });
        if (response.Status === 'SUCCESS') {
            setTableData(response);
            setTableLoading(false);
        } else if (response.Status === 'ERROR') {
            setTableData([]);
            setTableLoading(false);
        } else {
            NotificationSound(response.Status, response.message, response.focus);
        }
    };

    const handleReset = async () => {
        await setFormData(initialState);
        setSortConfig({ sortColumn: null, sortOrder: null });
    };

    useEffect(() => {
        document.title = ' Offline Booking';
    }, [currentPageNo, sortConfig, pageSize]);

    const handleParse = () => {
        const lines = formData.enteredDetails.split('\n').map(line => line.trim()).filter(Boolean);

        setFormData(prev => ({
            ...prev,
            name: lines[0] || "",
            mobileNo: lines[1] || "",
            addressLine1: lines[2] || "",
            addressLine2: lines[3] || "",
            pincode: lines[4] || ""
        }));
    };

    return (
        <>
            <div className="bg-white py-2 px-2 mt-2 rounded-xl shadow-2xl">
                <div className='font-medium'> Offine Booking</div>

                <div className="grid-cols-1 grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                    <TextAreaBox
                        label='Enter the Details'
                        rows='5'
                        inputrefs={inputrefs}
                        id='txtEntertheDetails'
                        value={formData.enteredDetails}
                        onChange={(e) => setFormData({
                            ...formData,
                            enteredDetails: e.target.value,
                            name: "",
                            mobileNo: "",
                            addressLine1: "",
                            addressLine2: "",
                            pincode: ""
                        })}
                        /*onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtContent')
                            }
                        }}*/
                        onBlur={() => {
                            handleParse()
                        }}
                        maxLength="500"
                        required={true}
                    />
                </div>
                <div className="grid-cols-1 grid gap-2 md:grid-cols-5 lg:grid-cols-5">
                    <InputBox
                        label='Name'
                        inputrefs={inputrefs}
                        id='txtName'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtCountry')
                            }
                        }}
                        maxLength="2"
                        disabled={true}
                    />

                    <InputBox
                        label='Mobile No'
                        inputrefs={inputrefs}
                        id='txtMobileNo'
                        value={formData.mobileNo}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtCountry')
                            }
                        }}
                        maxLength="2"
                        disabled={true}
                    />

                    <InputBox
                        label='Address Line 1'
                        inputrefs={inputrefs}
                        id='txtAddressLine1'
                        value={formData.addressLine1}
                        onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtCountry')
                            }
                        }}
                        maxLength="2"
                        disabled={true}
                    />

                    <InputBox
                        label='Address Line 2'
                        inputrefs={inputrefs}
                        id='txtAddressLine2'
                        value={formData.addressLine2}
                        onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtCountry')
                            }
                        }}
                        maxLength="2"
                        disabled={true}
                    />

                    <InputBox
                        label='Pincode'
                        inputrefs={inputrefs}
                        id='txtPincode'
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtCountry')
                            }
                        }}
                        maxLength="2"
                        disabled={true}
                    />
                </div>

                <div className="grid-cols-2 grid gap-2 md:grid-cols-4 lg:grid-cols-4">
                    <InputBox
                        label='Content'
                        inputrefs={inputrefs}
                        id='txtContent'
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtQuantity')
                            }
                        }}
                        maxLength="2"
                    />

                    <InputBox
                        label='Quantity'
                        inputrefs={inputrefs}
                        id='txtQuantity'
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: convertTwoDecimalsOnValue(e.target.value) })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtRate')
                            }
                        }}
                        maxLength="10"
                    />

                    <InputBox
                        label='Rate'
                        inputrefs={inputrefs}
                        id='txtRate'
                        value={formData.rate}
                        onChange={(e) => setFormData({ ...formData, rate: convertTwoDecimalsOnValue(e.target.value) })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtAmount')
                            }
                        }}
                        maxLength="10"
                    />

                    <InputBox
                        label='Amount'
                        inputrefs={inputrefs}
                        id='txtAmount'
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: convertTwoDecimalsOnValue(e.target.value) })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtCountry')
                            }
                        }}
                        maxLength="10"
                    />

                </div>

                <div className="flex gap-6 mt-2">
                    {options.map((option) => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <div className="w-4 h-4 rounded-full border border-black flex items-center justify-center">
                                {formData.bookingType === option && (
                                    <div className="w-2 h-2 rounded-full bg-black" />
                                )}
                            </div>
                            <span className="text-sm">{option}</span>
                            <input
                                type="radio"
                                name="plan"
                                value={option}
                                checked={formData.bookingType === option}
                                onChange={() => setFormData(prev => ({ ...prev, bookingType: option }))}
                                className="hidden"
                            />
                        </label>
                    ))}
                </div>

                <div className="mt-3 flex items-center gap-3">
                    <CustomButton
                        label='Search'
                        inputrefs={inputrefs}
                        id={'btn_Save'}
                        color={'blue'}
                        onClick={(e) => InsertUpdateOfflineBooking()}
                    />

                    <CustomButton
                        label='Reset'
                        inputrefs={inputrefs}
                        id={'btn_Reset'}
                        color={'red'}
                        onClick={async () => handleReset()}
                    />
                </div>
            </div>

            {/* <Table
                tableLoading={tableLoading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                PageName={'OfflineBooking'}
                handleFilter={() => {
                    setFilterData({
                        ...filterData,
                    });
                    showGridData();
                }}
                pageSize={pageSize}
                setPageSize={setPageSize}
                Filter={true}
                filterData={filterData}
                tableData={tableData}
                setFilterData={setFilterData}
                currentPageNo={currentPageNo}
                handleChange1={handleChange1}
                handleSorting={handleSorting}
                sortConfig={sortConfig}
            />*/}
        </>
    );
};

export default OfflineBooking;