const Loader = () => {
    return (
        <>
            <div className={`left-0 fixed z-50 top-0 flex h-screen w-screen flex-col items-center justify-center bg-yellow-50`}>
                <div className="flex flex-row gap-4">
                    <div
                        className="h-12 w-12 animate-spin rounded-full border-y border-solid border-cyan-500 border-t-transparent shadow-md">
                    </div>

                    <div
                        className="border-y-2 h-12 w-12 animate-spin rounded-full border-solid border-violet-500 border-t-transparent shadow-md">
                    </div>

                    <div
                        className="border-y-4 h-12 w-12 animate-spin rounded-full border-solid border-pink-500 border-t-transparent shadow-md">
                    </div>

                    <div
                        className="border-y-8 h-12 w-12 animate-spin rounded-full border-solid border-green-500 border-t-transparent shadow-md">
                    </div>
                </div>
                <div className='py-4 text-2xl font-semibold text-zinc-600'>Loading...</div>
            </div>
        </>
    )
}

export default Loader
