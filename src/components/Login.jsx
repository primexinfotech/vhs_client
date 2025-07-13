import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo1.png'
import { ApiCall, LoginAPI, NotificationSound, setFocus } from "./Common/Method";
import Loader from "./Common/Loader";
import { SetSession } from "./Common/CustomHooks";
export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [recipe, setRecipe] = useState({
        userCode: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        document.title = "Login";
        setFocus('txtUserCode')
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        let response = await LoginAPI(`/api/UserLogin/Login`, { ...recipe })
        let record = response.data
        if (record.status === 'SUCCESS') {


            var login_data = {
                eCode: record.eCode,
                eName: record.eName,
                loginSessionID: record.loginSessionID,
                unitState: record.unitState,
                userType: record.userType,
            }

            SetSession('cookies', 'user', login_data)
            SetSession('cookies', 'loginSessionID', record.loginSessionID)
            SetSession('cookies', 'EmpCode', record.eCode)
            SetSession('cookies', 'EmpName', record.eName)
            SetSession('localStorage', 'empPhoto', response.empPhoto)

            await navigate('/dashboard')
            setLoading(false)

        } else if (record.status === 'ERROR') {
            await NotificationSound(record.status, record.message, record.focus);
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex min-h-screen relative" style={{ backgroundColor: "#CEE5ED" }}>
                {/* Left Section - Hidden on small screens */}
                <div className="w-7/12 flex-col p-5 hidden md:flex fixed h-full" style={{ backgroundColor: "#CEE5ED" }}>
                    {/*<img*/}
                    {/*    src={logo}*/}
                    {/*    alt="VHS Logo"*/}
                    {/*    className="w-40"*/}
                    {/*/>*/}

                    {/* Carousel at the bottom */}
                    <div className="mt-auto mb-4 px-4">
                        <Carousel
                            autoPlay
                            infiniteLoop
                            showThumbs={false}
                            showStatus={false}
                            showArrows={false}
                            showIndicators={true}
                        >
                            <div>
                                <img
                                    src="https://panel.shipmozo.com/images/slider/5.svg"
                                    alt="Slide 1"
                                    className="mx-auto max-w-md"
                                />
                            </div>
                            <div>
                                <img
                                    src="https://panel.shipmozo.com/images/slider/4.svg"
                                    alt="Slide 2"
                                    className="mx-auto max-w-md"
                                />
                            </div>
                            <div>
                                <img
                                    src="https://panel.shipmozo.com/images/slider/1.svg"
                                    alt="Slide 3"
                                    className="mx-auto max-w-md"
                                />
                            </div>
                            <div>
                                <img
                                    src="https://panel.shipmozo.com/images/slider/3.svg"
                                    alt="Slide 4"
                                    className="mx-auto max-w-md"
                                />
                            </div>
                        </Carousel>
                    </div>
                </div>

                {/* Right Section - Login Form */}
                <div className="w-full md:w-5/12 bg-white flex flex-col justify-center px-6 md:px-20 ml-auto min-h-screen overflow-y-auto">
                    {/* Logo for small screens only */}
                    <div className="text-center flex justify-center mb-4">
                        <img
                            src={logo}
                            alt="VHS Logo"
                            className="w-45"
                        />
                    </div>

                    <h2 className="text-md font-bold text-gray-800 mb-4 mt-4 text-center md:text-left flex justify-center text-[20px]">
                        Login to Jaipur Logistics
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="relative block w-full">
                                <span className="text-gray-800 text-xs font-medium">Email or phone</span>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 mt-6 text-gray-500">
                                    <i className="fa fa-user" />
                                </span>
                                <input
                                    className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                                    placeholder="Enter your email or phone"
                                    type="text"
                                    value={recipe.userCode}
                                    onChange={(e) => {
                                        setRecipe(prev => ({ ...prev, userCode: e.target.value }))
                                    }}
                                    autoComplete="off"
                                    id='txtUserCode'
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setFocus("txtPassword")
                                        };
                                    }}
                                />
                            </label>
                        </div>

                        <div>
                            <label className="relative block w-full">
                                <span className="text-gray-800 text-xs font-medium">Password</span>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 mt-6 text-gray-500">
                                    <i className="fa fa-lock" />
                                </span>
                                <input
                                    className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-10 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                                    placeholder="*********"
                                    type={showPassword ? "text" : "password"}
                                    value={recipe.password}
                                    onChange={(e) => {
                                        setRecipe(prev => ({ ...prev, password: e.target.value }))
                                    }}
                                    id='txtPassword'
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setFocus("login_btn")
                                        };
                                    }}
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6 text-gray-500 cursor-pointer">
                                    {!showPassword ? (
                                        <i className="fa fa-eye" onClick={() => setShowPassword(true)} />
                                    ) : (
                                        <i className="fa fa-eye-slash" onClick={() => setShowPassword(false)} />
                                    )}
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox text-blue-600" />
                                <span className="ml-2 text-gray-700 text-xs">Remember me</span>
                            </label>
                            <a href="#" className="text-blue-600 text-xs hover:underline" alt=''>
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            //type="submit"
                            id='login_btn'
                            className="w-full text-md bg-cyan-700 cursor-pointer hover:bg-cyan-800 text-white font-semibold py-1 rounded-lg transition duration-300"
                            onClick={(e) => handleLogin(e)}
                        >
                            Log In
                        </button>
                    </div>

                    <div className="mt-3 text-xs font-medium text-center md:text-left flex">
                        <span className="text-gray-700">New to Shipmozo?</span>{" "}
                        <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => navigate('/register-account')} >
                            Create an account
                        </span>
                    </div>

                    <div className="mt-8 text-xs text-gray-900 space-x-2 font-medium text-center md:text-left">
                        <a href="#" className="hover:underline" alt=''>
                            Privacy policy
                        </a>
                        <a href="#" className="hover:underline" alt=''>
                            Refund & Cancellation
                        </a>
                        <a href="#" className="hover:underline" alt=''>
                            Terms and Conditions
                        </a>
                    </div>
                </div>
            </div>

            {loading && <Loader />}
        </>
    );
}
