import { useRef, useState } from 'react';
import { InputBox, ReactSelectSearch } from '../../Common/FormInputs';
import {
    FaCalculator,
    FaList,
    FaChartLine,
    FaTruck,
    FaDownload,
    FaRupeeSign
} from 'react-icons/fa';
import { TopTabs } from '../../Common/TopTabs';

const RateCalculator = () => {
    const inputrefs = useRef([]);

    const [activeTab, setActiveTab] = useState('Rate Calculator');
    const tabs = [
        { name: 'Rate Calculator', icon: <FaCalculator />, link: '/tools/rate-calculator' },
        { name: 'Shipment Price List', icon: <FaList />, link: '' },
        { name: 'Activity Logs', icon: <FaChartLine />, link: '' },
        { name: 'Courier Manage', icon: <FaTruck />, link: '/tools/manage-courier' },
        { name: 'Reports Download', icon: <FaDownload />, link: '/tools/report-table' }
    ];
    const [selected, setSelected] = useState("Domestic");

    const [formData, setFormData] = useState({
        shipmentType: "",
        packageType: "",
        deliveryCode: "",
        originPincode: "",
        deliveryAreaPincode: "",
        approximateWeight: "",
        invoiceValue: "",
        paymentMode: "",
        shipmentPurpose: "",
        length: "",
        width: "",
        height: ""
    })
    return (
        <>
            <TopTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />


            <div className="bg-white py-8 px-2 mt-2 rounded-xl shadow-2xl">

                <div className="inline-flex items-center p-1 rounded-full bg-white border border-gray-300 shadow-sm">
                    <button
                        onClick={() => {
                            setSelected("Domestic")
                            setFormData({
                                shipmentType: "",
                                packageType: "",
                                deliveryCode: "",
                                originPincode: "",
                                deliveryAreaPincode: "",
                                approximateWeight: "",
                                invoiceValue: "",
                                paymentMode: "",
                                shipmentPurpose: "",
                                length: "",
                                width: "",
                                height: ""
                            })
                        }}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${selected === "Domestic"
                            ? "bg-teal-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        Domestic
                    </button>
                    <button
                        onClick={() => {
                            setSelected("International")
                            setFormData({
                                shipmentType: "",
                                packageType: "",
                                deliveryCode: "",
                                originPincode: "",
                                deliveryAreaPincode: "",
                                approximateWeight: "",
                                invoiceValue: "",
                                paymentMode: "",
                                shipmentPurpose: "",
                                length: "",
                                width: "",
                                height: ""
                            })
                        }}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${selected === "International"
                            ? "bg-teal-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        International
                    </button>
                </div>
                <div className="grid mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">

                    {selected === 'Domestic' && <ReactSelectSearch
                        id="txtShipmentType"
                        label='Shipment Type'
                        onFocus={(e) => e.target.select()}
                        inputrefs={inputrefs}
                        value={formData.shipmentType}
                        options={[]}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, shipmentType: e }))
                        }}
                        required
                    />}

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
                        label='Origin Pincode '
                        inputrefs={inputrefs}
                        id='txtOriginPincode'
                        value={formData.originPincode}
                        onChange={(e) => setFormData({ ...formData, originPincode: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="60"
                        required={true}
                    />

                    {selected === 'International' && <ReactSelectSearch
                        id="txtDeliveryCountry "
                        label='Delivery Country '
                        onFocus={(e) => e.target.select()}
                        inputrefs={inputrefs}
                        value={formData.deliveryCountry}
                        options={[]}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, deliveryCountry: e }))
                        }}
                        required
                    />}

                    <InputBox
                        label='Delivery Area Pincode '
                        inputrefs={inputrefs}
                        id='txtDeliveryAreaPincode'
                        value={formData.deliveryAreaPincode}
                        onChange={(e) => setFormData({ ...formData, deliveryAreaPincode: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="60"
                        required={true}
                    />

                    {selected === 'Domestic' && <ReactSelectSearch
                        id="txtPayment Mode"
                        label='Payment Mode'
                        onFocus={(e) => e.target.select()}
                        inputrefs={inputrefs}
                        value={formData.paymentMode}
                        options={[]}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, paymentMode: e }))
                        }}
                        required
                    />}

                    <InputBox
                        label='Approximate Weight '
                        inputrefs={inputrefs}
                        id='txtApproximateWeight'
                        value={formData.approximateWeight}
                        onChange={(e) => setFormData({ ...formData, approximateWeight: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="60"
                        showIconTextEnd={true}
                        endTextIcon='Kg'
                        required={true}
                    />

                    <InputBox
                        label='Invoice Value '
                        inputrefs={inputrefs}
                        id='txtInvoiceValue'
                        value={formData.invoiceValue}
                        onChange={(e) => setFormData({ ...formData, invoiceValue: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputrefs.current['txtActive'].focus()
                            }
                        }}
                        maxLength="60"
                        showIconTextStart={true}
                        startIcon={<FaRupeeSign />}
                        required={true}
                    />

                    {selected === 'International' && <ReactSelectSearch
                        id="txtShipmentPurpose "
                        label='Shipment Purpose'
                        onFocus={(e) => e.target.select()}
                        inputrefs={inputrefs}
                        value={formData.shipmentPurpose}
                        options={[]}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, shipmentPurpose: e }))
                        }}
                        required
                    />}
                </div>

                <div className='mt-3'>
                    <div className='font-medium text-[15px]'> Dimensions</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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

                    <button
                        className="w-[120px] cursor-pointer mt-5 bg-teal-700 text-white font-semibold py-1 rounded hover:bg-teal-800 transition duration-200"
                    >
                        Calculate
                    </button>
                </div>

            </div>
        </>
    )
}
export default RateCalculator;