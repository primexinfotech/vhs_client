import { useEffect, useRef, useState } from "react";
import { CustomButton, InputBox, ReactSelectSearch, Switch } from "../../Common/FormInputs";
import { Table } from "../../Common/Table";
import { ApiCall, ConfirmAlertBox, NotificationSound, setFocus } from "../../Common/Method";
import { setGlobalLoader } from "../../../Redux/authSlice";
import { useDispatch } from "react-redux";

const PincodeMaster = () => {
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
        pinCodeID: "",
        pinCode: "",
        city: "",
        country: "",
        state: "",
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
        let response = await ApiCall(`/api/Master/ShowPincodeMaster`, { ...request });
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

    const InsertUpdatePincodeMaster = async () => {
        let request = {
            ...formData,
        };
        await dispatch(setGlobalLoader(true));
        let response = await ApiCall(`/api/Master/InsertUpdatePincodeMaster`, { ...request });
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
            pinCodeID: `${id}`,
        };
        ConfirmAlertBox("Warning", "Are you sure want to delete", async (confirmed) => {
            if (confirmed) {
                try {
                    await dispatch(setGlobalLoader(true));
                    const response = await ApiCall('/api/Master/DeletePincodeMaster', { ...request });
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
            pinCodeID: `${id}`,
        };
        try {
            await dispatch(setGlobalLoader(true));
            const response = await ApiCall('/api/Master/EditPincodeMaster', { ...request });
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
        document.title = 'PinCode Master';
        showGridData();
        setFocus("txtPinCode")
    }, [currentPageNo, sortConfig, pageSize]);

    return (
        <>
            <div className="bg-white py-2 px-2 mt-2 rounded-xl shadow-2xl">
                <div className='font-medium'>PinCode Master</div>

                <div className="grid-cols-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">

                    <InputBox
                        label='PinCode'
                        inputrefs={inputrefs}
                        id='txtPinCode'
                        value={formData.pinCode}
                        onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtCity')
                            }
                        }}
                        maxLength="2"
                        required={true}
                    />

                    <ReactSelectSearch
                        id="txtCity"
                        label='City'
                        value={formData.city}
                        inputrefs={inputrefs}

                        onFocus={(e) => e.target.select()}
                        options={[]}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, city: e }))
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtCountry')
                            }
                        }}
                        required
                    />

                    <ReactSelectSearch
                        id="txtCountry"
                        label='Country'
                        value={formData.country}
                        inputrefs={inputrefs}

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

                        onFocus={(e) => e.target.select()}
                        value={formData.state}
                        options={[]}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, state: e }))
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtActive')
                            }
                        }}
                        required
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
                        onClick={(e) => InsertUpdatePincodeMaster()}
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
                PageName={'PincodeMaster'}
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

export default PincodeMaster;