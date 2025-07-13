import { useNavigate } from 'react-router-dom';
export const TopTabs = ({ tabs, activeTab, setActiveTab }) => {
    const navigate = useNavigate()
    return (
        <>
            <div className="bg-[#c3d5e6] rounded-xl text-[15px] shadow-sm w-full">
                <div className="flex w-full">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => navigate(tab.link)}
                            className={`cursor-pointer flex flex-col items-center justify-center flex-1 py-2 relative text-[12px] transition-colors duration-200 ${activeTab === tab.name
                                ? 'text-sky-600 font-semibold'
                                : 'text-gray-700'
                                }`}
                        >
                            <div className="text-[14px] mb-1">{tab.icon}</div>
                            <span className='text-[10px] font-medium'>{tab.name}</span>
                            {activeTab === tab.name && (
                                <span className="absolute overflow-hidden bottom-0 left-[2px] w-full h-[2px] bg-sky-600 rounded-t-full"></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </>)
} 