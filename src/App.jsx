import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/Pages/Dashboard";
import Settings from "./components/Pages/Settings";
import Profile from "./components/Pages/UserProfile/Profile";
import RateCalculator from "./components/pages/Tools/RateCalculator";
import ReportTable from "./components/pages/Tools/ReportTable";
import ManageCourier from "./components/pages/Tools/ManageCourier";
import Orders from "./components/pages/Orders/Orders";
import AddNewOrder from "./components/pages/Orders/AddNewOrder";
import CountryMaster from "./components/pages/Master/CountryMaster";
import PageNotFound from "./components/Common/PageNotFound";
import StateMaster from "./components/pages/Master/StateMaster";
import CityMaster from "./components/pages/Master/CityMaster";
import PincodeMaster from "./components/pages/Master/PincodeMaster";
import VendorMaster from "./components/pages/Master/VendorMaster";
import OfflineBooking from "./components/pages/Master/OfflineBooking";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register-account" element={<Register />} />
                <Route path="*" element={<PageNotFound />} />

                <Route path="/" element={<MainLayout />}>
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/tools/rate-calculator" element={<RateCalculator />} />
                    <Route path="/tools/report-table" element={<ReportTable />} />
                    <Route path="/tools/manage-courier" element={<ManageCourier />} />
                    <Route path="/order/new" element={<Orders />} />
                    <Route path="/order/add-order" element={<AddNewOrder />} />
                    <Route path="/master/country-master" element={<CountryMaster />} />
                    <Route path="/master/state-master" element={<StateMaster />} />
                    <Route path="/master/city-master" element={<CityMaster />} />
                    <Route path="/master/pincode-master" element={<PincodeMaster />} />
                    <Route path="/master/vendor-master" element={<VendorMaster />} />
                    <Route path="/master/offline-booking" element={<OfflineBooking />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
