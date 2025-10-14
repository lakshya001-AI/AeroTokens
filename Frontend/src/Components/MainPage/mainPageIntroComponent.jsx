import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import ToastMessage, {showSuccessToast, showErrorToast} from '../ToastMessage/toastMessage';
import { Link } from 'react-router-dom';

const MainPageIntroComponent = () => {
    return (
        <div className="relative w-9xl h-[83vh] flex items-center justify-center text-center text-white overflow-hidden rounded-2xl shadow-lg mt-30 mx-7">

            {/* Background Image */}
            <img
                src="https://images.vasystem.org/Wr0cT8wMjohEDzLV7PFVvqjRaYLURAzDZcR_JELMXzs/rt:fill/g:sm/el:1/aHR0cHM6Ly9pbWFnZXMtc3RvcmFnZS52YXN5c3RlbS5vcmcvc3RhcmFsbGlhbmNldmlydHVhbC8yOC8wMS8yODAxNjViZTZjNTVhYjBhMDg5ZWQ4Yzg5NGE2N2M4OTYzOTBkMWNm"
                alt="Aircraft background"
                className="absolute inset-0 w-full h-full object-cover brightness-75"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#0a66ff]/30 to-black/60"></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl px-6 space-y-6">
                <h1 className="text-9xl md:text-8xl font-extrabold leading-tight drop-shadow-lg">
                    Tokenize <span className="text-[#4ea1ff]">Aircraft Assets</span> on the QIE Blockchain
                </h1>

                <p className="text-xl text-gray-200 leading-relaxed">
                    Own, trade, and invest in aircraft seamlessly — powered by the transparency of QIE Blockchain.
                </p>

                <div className="flex flex-wrap justify-center gap-5 pt-6">
                    <Link to="/marketPlace">
                        <button className="px-8 py-3 bg-[#0a66ff] hover:bg-[#0044cc] font-semibold rounded-full shadow-lg transition cursor-pointer">
                            Explore Aircraft
                        </button>
                    </Link>
                    <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-[#0a66ff] font-semibold rounded-full transition cursor-pointer" 
                    onClick={()=>showErrorToast("Error getting the details. Please try again later.")}>
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MainPageIntroComponent;
