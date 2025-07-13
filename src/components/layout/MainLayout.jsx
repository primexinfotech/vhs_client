import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

import { useSelector } from 'react-redux'
import Loader from "../Common/Loader";
export default function MainLayout() {
    const [sideClose, setSideClose] = useState(false);
    const { globalLoader } = useSelector((state) => state.authData)

    let Auth_User = localStorage.getItem('eCode')
    const handleClick = () => {
        setSideClose(!sideClose);
    }


    return (
        <>
            {
                Auth_User ?
                    <>
                        {globalLoader && <Loader />}
                        <div className='relative h-full min-h-screen w-full'>
                            <div className={`fixed ${sideClose ? '-translate-x-[250px]' : ''} w-[250px] z-20 transition-all duration-300 ease-in bg-white shadow-2xl h-screen`}>
                                <Sidebar handleClick={handleClick} sideClose={sideClose} />
                            </div>
                            <div className={`${sideClose ? 'ms-0' : 'md:ms-[250px]'} transition-all duration-300 ease-in`}>
                                <div className={`sticky z-10 top-0 w-full bg-yellow-50`}>
                                    <Header handleClick={handleClick} sideClose={sideClose} />
                                </div>
                                <div className={`mt-3 ${sideClose ? "px-3" : 'ps-3 pe-3'} pb-5`}>
                                <Outlet />
                            </div>
                        </div>
                    </div>
        </> :
    <Navigate to="/" replace={true} />
}
        </>
    );
}
