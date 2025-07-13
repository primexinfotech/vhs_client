import { useEffect, useRef, useState } from "react";
import { CustomButton, InputBox, ReactSelectSearch, Switch } from "../../Common/FormInputs";
import { Table } from "../../Common/Table";
import { ApiCall, ConfirmAlertBox, NotificationSound, setFocus } from "../../Common/Method";
import { setGlobalLoader } from "../../../Redux/authSlice";
import { useDispatch } from "react-redux";

const VendorMaster = () => {
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

    const initialState = {
        vendorID: "",
        vendorCode: "System Generated",
        vendorName: "",
        phoneNo: "",
        emailID: "",
        pincode: "",
        city: "",
        country: "",
        state: "",
        addressLine1: "",
        active: true
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
            ...filterData,
            pageIndex: `${currentPageNo}`,
            pageSize: pageSize
        };
        setTableLoading(true);
        let response = await ApiCall(`/api/Master/ShowVendorMaster`, { ...request });
        if (response.Status === 'SUCCESS') {
            setTableData(prev => ({
                ...prev, ...response, HideColumns: [...response.HideColumns, 'SrNo', 'TotalRecord','PageSize','VendorID']
            }))
            setTableLoading(false);
        } else if (response.Status === 'ERROR') {
            setTableData([]);
            setTableLoading(false);
        } else {
            NotificationSound(response.Status, response.message, response.focus);
        }
    };

    const InsertUpdateVendorMaster = async () => {
        let request = {
            ...formData,
        };
        await dispatch(setGlobalLoader(true));
        let response = await ApiCall(`/api/Master/InsertUpdateVendorMaster`, { ...request });
        await dispatch(setGlobalLoader(false));
        if (response.status === 'SUCCESS') {
            handleReset();
            NotificationSound(response.status, response.message, 'txtCountryName');
            showGridData();
        } else {
            NotificationSound(response.status, response.message, response.focus);
            setFocus(response.focus)
        }
    };

    const handleDelete = async (id) => {
        const request = {
            vendorID: `${id}`,
        };
        ConfirmAlertBox("Warning", "Are you sure want to delete", async (confirmed) => {
            if (confirmed) {
                try {
                    await dispatch(setGlobalLoader(true));
                    const response = await ApiCall('/api/Master/DeleteVendorMaster', { ...request });
                    await dispatch(setGlobalLoader(false));
                    if (response.status === 'SUCCESS') {
                        NotificationSound(response.status, response.message, response.focus);
                        showGridData();
                    } else {
                        NotificationSound(response.status, response.message, response.focus);
                    }
                } catch (error) {
                    NotificationSound('ERROR', 'Failed to show the data. Please try again.');
                }
            }
        });
    };

    const handleEdit = async (id) => {
        const request = {
            vendorID: `${id}`,
        };
        try {
            await dispatch(setGlobalLoader(true));
            const response = await ApiCall('/api/Master/EditVendorMaster', { ...request });
            await dispatch(setGlobalLoader(false));
            let record = response.data
            if (response.status === 'SUCCESS') {
                const { productPreviewUrl, focus, message, status, ...restResponse } = record;
                setFormData(restResponse);
                setFocus('txtCountryName');
            } else {
                NotificationSound(record.status, record.message, record.focus);
            }
        } catch (error) {
            NotificationSound('ERROR', 'Failed to show the data. Please try again.');
        }
    };

    const handleReset = async () => {
        await setFormData(initialState);
        setSortConfig({ sortColumn: null, sortOrder: null });
    };

    useEffect(() => {
        document.title = 'Vendor Master';
        showGridData();
        setFocus("txtVendorName")
    }, [currentPageNo, sortConfig, pageSize]);

    return (
        <>
            <div className="bg-white py-2 px-2 mt-2 rounded-xl shadow-2xl">
                <div className='font-medium'>Vendor Master</div>

                <div className="grid-cols-1 grid gap-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4">
                    <InputBox
                        label='Vendor Code'
                        inputrefs={inputrefs}
                        id='txtVendorCode'
                        value={formData.vendorCode}
                        disabled
                        readOnly
                    />

                    <InputBox
                        label='Vendor Name'
                        inputrefs={inputrefs}
                        id='txtVendorName'
                        value={formData.vendorName}
                        onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtPhoneNo')
                            }
                        }}
                        maxLength="2"
                        required={true}
                    />

                    <InputBox
                        label='Phone No'
                        inputrefs={inputrefs}
                        id='txtPhoneNo'
                        value={formData.phoneNo}
                        onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtEmailID')
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
                                setFocus('txtCountry')
                            }
                        }}
                        maxLength="50"
                        required={true}
                    />

                    <ReactSelectSearch
                        id="txtCountry"
                        label='Country'
                        inputrefs={inputrefs}
                        value={formData.country}
                        onFocus={(e) => e.target.select()}
                        options={[]}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, country: e }))
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtState')
                            }
                        }}
                        required
                    />

                    <ReactSelectSearch
                        id="txtState"
                        label='State'
                        inputrefs={inputrefs}
                        onFocus={(e) => e.target.select()}
                        value={formData.state}
                        options={[]}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, state: e }))
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtCity')
                            }
                        }}
                        required
                    />

                    <ReactSelectSearch
                        id="txtCity"
                        label='City'
                        inputrefs={inputrefs}
                        value={formData.city}
                        onFocus={(e) => e.target.select()}
                        options={[]}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, city: e }))
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtPincode')
                            }
                        }}
                        required
                    />

                    <ReactSelectSearch
                        id="txtPincode"
                        label='Pincode'
                        inputrefs={inputrefs}
                        value={formData.pincode}
                        onFocus={(e) => e.target.select()}
                        options={[]}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, pincode: e }))
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtAddressLine1')
                            }
                        }}
                        required
                    />

                    <InputBox
                        label='Address Line 1'
                        inputrefs={inputrefs}
                        id='txtAddressLine1'
                        value={formData.addressLine1}
                        onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtActive')
                            }
                        }}
                        maxLength="2"
                        required={true}
                    />

                    <Switch
                        id="txtActive"
                        inputrefs={inputrefs}
                        checked={formData.active}
                        label={'Active'}
                        onChange={(e) => setFormData((prevData) => ({
                            ...prevData,
                            active: e.target.checked,
                        }))}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                setFocus('btn_Save')
                            }
                        }}
                    />
                </div>

                <div className="mt-3 flex items-center gap-3">
                    <CustomButton
                        label='Save'
                        inputrefs={inputrefs}
                        id={'btn_Save'}
                        color={'blue'}
                        onClick={(e) => InsertUpdateVendorMaster()}
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

            <Table
                tableLoading={tableLoading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                PageName={'VendorMaster'}
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
            />
        </>
    );
};

export default VendorMaster;