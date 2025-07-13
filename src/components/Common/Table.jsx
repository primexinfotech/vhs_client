import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

export const Table = ({
    handleEdit,
    filterData,
    handleApprove,
    OtherExport = false,
    handlePrint,
    handlePrint1,
    matchingkey,
    matchingkey2,
    matchingkey3,
    ClickOnLink,
    handleDetail,
    handleCheck,
    handleCheckAll,
    checkAll,
    showCheckBox,
    handleExport,
    PageName,
    tableLoading: loading = false,
    Filter = true,
    handleChange1,
    currentPageNo,
    setFilterData,
    handleSorting,
    sortConfig,
    handleDelete,
    handleFilter,
    AdvancedFilter = true,
    tableData,
    children,
    onlyFilterPage = false,
    apiUrlExportData,
    handleDownLoadExcel,
    exportExcelData = false,
    pageSize = '',
    setPageSize
}) => {
    const [MainData, setMainData] = useState(tableData?.Data ? tableData?.Data : []);
    const [ColoredRow, setColoredRow] = useState('');
    const [serchingData, setSerchingData] = useState([]);
    const [advanceSearchingData, setAdvanceSearchingData] = useState([]);

    const finalHeaderKeys = tableData?.HeadersKey?.length > 0
        ? tableData?.HeadersKey?.filter((key) => !tableData?.HideColumns.includes(key))
        : Array.from(
            new Set(
                tableData?.Data?.flatMap((data) => Object.keys(data))
                    .filter((columnName) => !tableData?.HideColumns.includes(columnName))
            )
        );

    const finalHeadersValue = (tableData?.HeadersKey?.length > 0 && tableData?.HeadersValue?.length > 0)
        ? tableData.HeadersValue.filter((key) => !tableData?.HideColumns.includes(key))
        : Array.from(
            new Set(
                tableData.Data?.flatMap((data) => Object.keys(data))
                    .filter((columnName) => !tableData?.HideColumns.includes(columnName))
            )
        );

    const handleHighlight = (id, index) => {
        const highlightedId = id !== undefined ? id : index;
        setColoredRow(highlightedId);
    };

    const RequestData = {
        "PageName": PageName
    };

    const serching = async () => {
        if (Filter) {
            // You'll need to implement ApiCall or import it
            let data = await ApiCall('/api/Dashboard/BindSearchingColumnList', RequestData)
            setSerchingData(data.getSearchingList)
            setAdvanceSearchingData(data.advanceDataList)
            setFilterData({
                ...filterData,
                SearchFieldValue: data.getSearchingList[0].searchingValue,
                StartValue: PageName === 'PlanMaster' ? "Contains" : 'Exactly'
            })
        }
    };

    const countNo = Math.ceil((parseInt(tableData?.TotalRecord) / parseInt(tableData?.PageSize)));

    useEffect(() => {
        // Uncomment if you want to enable searching
        // serching();
    }, []);

    useEffect(() => {
        setMainData(tableData?.Data)
    }, [tableData]);

    return (
        <>
            <div className="mt-5 rounded-xl shadow-2xl bg-white p-3">
                <div className="">
                    {!loading && (
                        <div className='flex items-center justify-between'>
                            <div className='mb-1 flex gap-2'>
                                <h6 className='mb-sm-0 font-weight-bold m-0' style={{ color: '#4E2D87' }}>
                                    <span>{`${tableData?.TotalRecord !== undefined ? 'Total Records : ' + tableData?.TotalRecord : 'No Record Found'}`}</span>
                                    <span>{showCheckBox && tableData?.Data?.filter(d => d.checkStatus).length > 0 ? `, Selected: ${tableData?.Data?.filter(d => d.checkStatus).length}` : ''}</span>
                                </h6>

                                {exportExcelData && (
                                    <div
                                        onClick={handleDownLoadExcel}
                                        className="m-0 mx-auto flex cursor-pointer items-center justify-center rounded-full bg-black px-5 pb-1 pt-1 text-sm font-semibold leading-none text-white"
                                    >
                                        <span className="me-2"><i className="fa fa-download"></i></span>Export
                                    </div>
                                )}
                            </div>

                            {/* Filter and Advance Filter Icon and paging*/}
                            <div className={`mb-1`}>
                                <div className="flex">
                                    {Filter && (
                                        //Normal Filter Inputs
                                        <div className='flex'>
                                            <div className='flex gap-3'>
                                                <div className="grid-cols-1 grid gap-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
                                                    <div className="mb-1">
                                                        <select
                                                            value={filterData?.SearchFieldValue}
                                                            onChange={(e) => setFilterData({ ...filterData, SearchFieldValue: e.target.value })}
                                                            id="txtFilter1"
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 focus:outline-none 2xl:py-1.5 2xl:px-2.5"
                                                        >
                                                            {Array.isArray(serchingData) ? (
                                                                serchingData?.map((list, i) => (
                                                                    <option key={`filterList${i}`} value={list?.searchingValue}> {list?.placeholderText}</option>
                                                                ))
                                                            ) : (<></>)}
                                                        </select>
                                                    </div>
                                                    <div className="mb-1">
                                                        <select
                                                            id="txtFilter2"
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 focus:outline-none 2xl:py-1.5 2xl:px-2.5"
                                                        >
                                                            <option value="Exactly">Exactly</option>
                                                            <option value="Contains">Contains</option>
                                                            <option value="Start With">Start With</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-1">
                                                        <input
                                                            type="text"
                                                            id="txtFilter3"
                                                            placeholder='Search'
                                                            value={filterData.SearchText}
                                                            onChange={(e) => setFilterData({ ...filterData, SearchText: e.target.value })}
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 h-[31px] px-2.5 py-1.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 focus:outline-none 2xl:py-1.5 2xl:px-2.5"
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex items-end pb-1'>
                                                    <button
                                                        id='filter_Search'
                                                        onClick={handleFilter}
                                                        className="flex h-[31px] items-center justify-center rounded-lg bg-green-600 px-3 py-2 font-semibold leading-none text-zinc-800 shadow-lg shadow-yellow-100"
                                                    >
                                                        <i className="fa-solid fa-magnifying-glass text-white"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {pageSize !== '' && (
                                        <div className='ps-3'>
                                            <select
                                                className="block h-[31px] w-fit rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 focus:outline-none 2xl:py-1.5 2xl:px-2.5"
                                                aria-label="PageSize"
                                                value={pageSize}
                                                onChange={(e) => setPageSize(e.target.value)}
                                            >
                                                <option value="10">10</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                                <option value="200">200</option>
                                                <option value="500">500</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {!loading ? (
                        <div className="w-full overflow-x-auto">
                           
                               
                                <div className=''>
                                    <div className="w-full overflow-x-auto">
                                        <table className='common-table'>
                                            <thead>
                                                <tr>
                                                    {tableData?.Data && tableData?.Actions && tableData?.Actions.length > 0 && tableData?.Actions.includes('Checkbox') === false && (
                                                        <th>Action</th>
                                                    )}
                                                    {tableData?.Data && tableData?.Data[0]?.hasOwnProperty("Checkbox") && PageName !== 'ManifestWithPackage' && (
                                                        <th style={{ width: showCheckBox ? '20px' : '10px' }} key="thActions">
                                                            <input
                                                                className="form-check-input mt-0"
                                                                type="checkbox"
                                                                checked={checkAll}
                                                                onChange={(e) => handleCheckAll(e.target.checked)}
                                                            />
                                                        </th>
                                                    )}
                                                    {finalHeaderKeys?.map((th, headIndex) => (
                                                        <th
                                                            key={`th${headIndex || 0}`}
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleSorting && handleSorting(finalHeadersValue[headIndex])}
                                                        >
                                                            {th}
                                                            {(sortConfig?.SortColumn !== null
                                                                && sortConfig?.SortOrder !== null
                                                                && sortConfig?.SortColumn === finalHeadersValue[headIndex]) ? (
                                                                PageName !== 'Dashboard' && (
                                                                    <>
                                                                        <i
                                                                            className="fa fa-arrow-up ms-2"
                                                                            onClick={() => handleSorting && handleSorting(finalHeadersValue[headIndex])}
                                                                            style={{
                                                                                color: sortConfig?.SortOrder !== 'DESC' ? '#d4d4d4' : 'red',
                                                                                fontSize: "14px"
                                                                            }}
                                                                        />
                                                                        <i
                                                                            className="fa fa-arrow-down"
                                                                            onClick={() => handleSorting && handleSorting(finalHeadersValue[headIndex])}
                                                                            style={{
                                                                                color: sortConfig?.SortOrder !== 'ASC' ? '#d4d4d4' : 'red',
                                                                                fontSize: "14px"
                                                                            }}
                                                                        />
                                                                    </>
                                                                )
                                                            ) : (
                                                                PageName !== 'Dashboard' && (
                                                                    <>
                                                                        <i
                                                                            className="fa fa-arrow-up ms-2"
                                                                            style={{ color: '#d4d4d4', fontSize: "14px" }}
                                                                            onClick={() => handleSorting && handleSorting(finalHeadersValue[headIndex])}
                                                                        />
                                                                        <i
                                                                            className="fa fa-arrow-down"
                                                                            style={{ color: '#d4d4d4', fontSize: "14px" }}
                                                                            onClick={() => handleSorting && handleSorting(finalHeadersValue[headIndex])}
                                                                        />
                                                                    </>
                                                                )
                                                            )}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {MainData?.map((item, bodyIndex) => (
                                                    <tr
                                                        className={`admin_classtable_heading admin_classtableheader TableTrhover ${ColoredRow === bodyIndex || item.Edit === ColoredRow ? 'activeTd' : ''}`}
                                                        key={`row${bodyIndex}`}
                                                        onClick={() => handleHighlight(item.Edit, bodyIndex)}
                                                        style={{ backgroundColor: showCheckBox && item.Color }}
                                                    >
                                                        {tableData?.Actions && tableData?.Actions.length > 0 && (
                                                            PageName !== 'ManifestWithPackage' &&
                                                            <td
                                                                className='text-sm font-normal text-zinc-700'
                                                                key={`tdAction${bodyIndex}`}
                                                                style={{ textAlign: 'center', width: '0rem' }}
                                                            >
                                                                {item.Actions !== undefined ?
                                                                    item.Actions?.split(',').map((btn, index) => (
                                                                        <span key={index}>
                                                                            {(btn === 'Edit') ? <i className="fa-regular fa-pen-to-square me-2 text-green-700" key={`row${bodyIndex}edit${index}`} title='Edit' onClick={() => handleEdit(item.Edit)} /> : (<></>)}
                                                                            {btn === 'Del' ? <i className="fa-regular fa-trash-can me-2 text-red-700" title='Delete' key={`row${bodyIndex}del${index}`} onClick={() => handleDelete(item.Del)} /> : (<></>)}
                                                                            {btn === 'Print' ? <i className="fa fa-print me-2" title='Print' style={{ cursor: 'pointer' }} key={`row${bodyIndex}print${index}`} onClick={() => handlePrint(item.Print)} /> : (<></>)}
                                                                            {btn === 'Print1' ? <i className="fa fa-print text-success me-2" title='ManifestPrint' style={{ cursor: 'pointer' }} key={`row${bodyIndex}print1${index}`} onClick={() => handlePrint1(item.Print1)} /> : (<></>)}
                                                                            {btn === 'Detail' ? <i className="fa fa-info-circle text-info me-2" title='Detail' role="button" key={`row${bodyIndex}Detail${index}`} onClick={() => handleDetail(item.Detail)} /> : (<></>)}
                                                                            {btn === 'Checkbox' ? (
                                                                                <input
                                                                                    className="form-check-input mt-0"
                                                                                    type="checkbox"
                                                                                    checked={item.checkStatus}
                                                                                    id={item.Checkbox}
                                                                                    onChange={(e) => handleCheck(e.target.checked, item.Checkbox, bodyIndex)}
                                                                                />
                                                                            ) : (<></>)}
                                                                            {btn === 'Approve' ? (
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => handleApprove(item.Approve)}
                                                                                    className="ApproveBtn btn btn-rounded btn-primary"
                                                                                >
                                                                                    <span className="me-1 text-white">
                                                                                        <i className="fa">&#xf0c7;</i>
                                                                                    </span>Approve
                                                                                </button>
                                                                            ) : (<></>)}
                                                                        </span>
                                                                    )) : tableData?.Actions?.map((btn, index) => (
                                                                        <span key={index}>
                                                                            {(btn === 'Edit') ? <i className="fa-regular fa-pen-to-square me-2 text-green-700" style={{ cursor: 'pointer' }} key={`row${bodyIndex}edit${index}`} title='Edit' onClick={() => handleEdit(item.Edit)} /> : (<></>)}
                                                                            {btn === 'Del' ? <i className="fa-regular fa-trash-can me-2 text-red-700" style={{ cursor: 'pointer' }} title='Delete' key={`row${bodyIndex}del${index}`} onClick={() => handleDelete(item.Del)} /> : (<></>)}
                                                                            {btn === 'Print' ? <i className="fa fa-print me-2" style={{ cursor: 'pointer' }} title='Print' key={`row${bodyIndex}print${index}`} onClick={() => handlePrint(item.Print)} /> : (<></>)}
                                                                            {btn === 'Print1' ? <i className="fa fa-print text-success me-2" title='ManifestPrint' style={{ cursor: 'pointer' }} key={`row${bodyIndex}print1${index}`} onClick={() => handlePrint1(item.Print1)} /> : (<></>)}
                                                                            {btn === 'Detail' ? <i className="fa fa-info-circle text-info me-2" style={{ cursor: 'pointer' }} title='Detail' role="button" key={`row${bodyIndex}Detail${index}`} onClick={() => handleDetail(item.Detail)} /> : (<></>)}
                                                                            {btn === 'Checkbox' ? (
                                                                                <input
                                                                                    className="form-check-input mt-0"
                                                                                    type="checkbox"
                                                                                    checked={item.checkStatus}
                                                                                    id={item.Checkbox}
                                                                                    onChange={(e) => handleCheck(e.target.checked, item.Checkbox, bodyIndex)}
                                                                                />
                                                                            ) : (<></>)}
                                                                            {btn === 'Approve' ? (
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => handleApprove(item.Approve)}
                                                                                    className="ApproveBtn btn btn-rounded btn-primary"
                                                                                >
                                                                                    <span className="me-1 text-white">
                                                                                        <i className="fa">&#xf0c7;</i>
                                                                                    </span>Approve
                                                                                </button>
                                                                            ) : (<></>)}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </td>
                                                        )}
                                                        {tableData?.Data && tableData?.Data[0]?.hasOwnProperty("Checkbox") && tableData?.Actions.includes('Checkbox') === false && PageName !== 'ManifestWithPackage' && (
                                                            <td className='text-center text-sm font-normal text-zinc-700'>
                                                                <input
                                                                    className="form-check-input mt-0"
                                                                    type="checkbox"
                                                                    checked={item.checkStatus}
                                                                    id={item.Checkbox}
                                                                    onChange={(e) => handleCheck(e.target.checked, item.Checkbox, bodyIndex)}
                                                                />
                                                            </td>
                                                        )}
                                                        {finalHeadersValue?.map((key, tdIndex) => (
                                                            (typeof (item[key]) === 'object') ? (
                                                                Array?.isArray(item[key]) ?
                                                                    (item[key].length > 0 ?
                                                                        <td className='text-sm font-normal text-zinc-700' key={`key${tdIndex}`}>
                                                                            <i
                                                                                className="fa fa-eye"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal"
                                                                                style={{ cursor: 'pointer', color: '#5a8dee' }}
                                                                            />
                                                                        </td> : <td key={`key${tdIndex}`}></td>) : (
                                                                        typeof (item[key]) === 'object' && item[key]?.FileType === 'pdf' ?
                                                                            <td key={`key${tdIndex}`} className='text-center'>
                                                                                pdf
                                                                            </td> :
                                                                            typeof (item[key]) === 'object' && item[key]?.FileType === 'xlsx' ?
                                                                                <td key={`key${tdIndex}`} className='text-center text-sm font-normal text-zinc-700'>
                                                                                    pdf
                                                                                </td> :
                                                                                typeof (item[key]) === 'object' && item[key]?.FileType === '' ?
                                                                                    <td key={`key${tdIndex}`}></td> :
                                                                                    <td key={`key${tdIndex}`} className='text-center text-sm font-normal text-zinc-700'>
                                                                                        <i
                                                                                            className="fa fa-image me-2"
                                                                                            title='show Image'
                                                                                            style={{ cursor: 'pointer', color: '#5a8dee', fontSize: '14px' }}
                                                                                        />
                                                                                        <i
                                                                                            className='fa fa-download'
                                                                                            title='Download'
                                                                                            style={{ cursor: 'pointer', color: '#5a8dee', fontSize: '14px' }}
                                                                                        />
                                                                                    </td>
                                                                    )
                                                            ) : (
                                                                <td
                                                                    className="text-sm font-normal text-zinc-700"
                                                                    key={`key${tdIndex}`}
                                                                    style={{ color: ColoredRow === bodyIndex || item.Edit === ColoredRow ? '#000' : '' }}
                                                                >
                                                                    {matchingkey !== key ? (
                                                                        item[key]
                                                                    ) : PageName === 'BankVerification' ? (
                                                                        <button
                                                                            onClick={() => ClickOnLink(item[key])}
                                                                            className="rounded-full px-8 mx-auto bg-yellow-400 text-zinc-800 text-sm font-semibold flex items-center justify-center m-0 pt-2 pb-1 leading-none"
                                                                        >
                                                                            {item['Status'].toLowerCase() === 'verified' ? 'View' : 'View & Verify'}
                                                                        </button>
                                                                    ) : PageName === 'IncompleteRegistration' ? (
                                                                        <>
                                                                            <div className='flex items-center gap-1'>
                                                                                <div className={`h-2.5 w-full rounded-full
                                                                                        ${(item[key] === '0%' || item[key] === '25%') ? 'bg-red-200' :
                                                                                        (item[key] === '50%' || item[key] === '75%') ? 'bg-yellow-100' :
                                                                                            (item[key] === '100%') ? 'bg-green-100' : ''
                                                                                    }
                                                                                `}>
                                                                                    <div className={`h-2.5 w-[${item[key]}] rounded-full
                                                                                        ${(item[key] === '0%' || item[key] === '25%') ? 'bg-red-600' :
                                                                                            (item[key] === '50%' || item[key] === '75%') ? 'bg-yellow-400' :
                                                                                                (item[key] === '100%') ? 'bg-green-400' : ''
                                                                                        }`}></div>
                                                                                </div>
                                                                                <div className='text-sm text-zinc-700'>{item[key]}</div>
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <> </>
                                                                    )}
                                                                </td>
                                                            )
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {countNo > 1 && (
                                        <div className='mt-2 flex items-center justify-between'>
                                            <div className=''>
                                                Showing page {currentPageNo} of {countNo}
                                            </div>
                                            <div className=''>
                                                <Pagination
                                                    className="text-nowrap pb-1"
                                                    count={countNo}
                                                    size="small"
                                                    variant="outlined"
                                                    page={currentPageNo}
                                                    onChange={handleChange1}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                           
                        </div>
                    ) : (
                        <div className="relative min-h-[350px] w-full">
                            <div className='-translate-x-2/4 -translate-y-2/4 absolute left-2/4 top-2/4 flex items-center justify-center'>
                                <div className="h-12 w-12 animate-spin rounded-full border-y border-solid border-cyan-500 border-t-transparent shadow-md"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {children}
        </>
    )
}