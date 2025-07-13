import { useEffect, useRef, useState } from "react";
import { CustomButton, InputBox, Switch } from "../../Common/FormInputs";
import { Table } from "../../Common/Table";
import { ApiCall, ConfirmAlertBox, NotificationSound, setFocus } from "../../Common/Method";
import { setGlobalLoader } from "../../../Redux/authSlice";
import { useDispatch } from "react-redux";

const CountryMaster = () => {
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
        countryID: "",
        countryName: "",
        countryCode: "",
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
        let response = await ApiCall(`/api/Master/ShowCountryMaster`, { ...request });
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

    const InsertUpdateCountryMaster = async () => {
        let request = {
            ...formData,
        };
        await dispatch(setGlobalLoader(true));
        let response = await ApiCall(`/api/Master/InsertUpdateCountryMaster`, { ...request });
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
            countryID: `${id}`,
        };
        ConfirmAlertBox("Warning", "Are you sure want to delete", async (confirmed) => {
            if (confirmed) {
                try {
                    await dispatch(setGlobalLoader(true));
                    const response = await ApiCall('/api/Master/DeleteCountryMaster', { ...request });
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
            countryID: `${id}`,
        };
        try {
            await dispatch(setGlobalLoader(true));
            const response = await ApiCall('/api/Master/EditCountryMaster', { ...request });
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
    };

    useEffect(() => {
        document.title = 'Country Master';
        showGridData();
    }, [currentPageNo, sortConfig, pageSize]);

    return (
        <>
            <div className="bg-white py-2 px-2 mt-2 rounded-xl shadow-2xl">
                <div className='font-medium'>Country Master</div>

                <div className="grid-cols-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    <InputBox
                        label='Country Code'
                        inputrefs={inputrefs}
                        id='txtCountryCode'
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtCountryName')
                            }
                        }}
                        maxLength="2"
                        required={true}
                    />

                    <InputBox
                        label='Country Name'
                        inputrefs={inputrefs}
                        id='txtCountryName'
                        value={formData.countryName}
                        onChange={(e) => setFormData({ ...formData, countryName: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFocus('txtActive')
                            }
                        }}
                        maxLength="10"
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
                        onClick={(e) => InsertUpdateCountryMaster()}
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
                PageName={'CountryMaster'}
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

export default CountryMaster;