import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowUpFromBracket, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import ToastMessage, {showSuccessToast, showErrorToast} from '../ToastMessage/toastMessage';

const FeaturedAircraft = () => {
    return (
        <div className="py-16 px-6 md:px-16 bg-gray-50">
            {/* Section Header */}
            <div className="mb-12 flex flex-col md:flex-row justify-between">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">Featured Aircraft</h2>
                    <p className="text-gray-600 text-xl">Discover <span className="text-[#0a66ff]">Premium aircraft</span> available for tokenization</p>
                </div>
                <Link to="/marketPlace">
                    <button className="bg-[#0a66ff] text-white font-medium rounded-md shadow hover:bg-[#0044cc] transition cursor-pointer px-8.5 py-3.5 h-fit">
                        View All Aircraft
                    </button>
                </Link>
            </div>

            {/* Aircraft Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                    <div>
                        <img
                            src="https://jetservicenl.com/files/aircraft/gulfstream-g650.1.jpg"
                            alt="Aircraft"
                            className="w-full h-60 object-cover"
                        />
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Gulfstream G650</h3>
                                <p className="text-gray-500">Business Jet</p>
                            </div>
                            <div className='mt-2'>
                                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold text-sm ">Coming Soon</span>
                            </div>
                        </div>

                        {/* Token Details */}
                        <div className="grid grid-cols-3 gap-4 text-center text-gray-700 text-sm bg-[#f5f8ff] p-6 rounded-xl">
                            <div className="space-y-1">
                                <p className="font-medium text-gray-500">Total Value</p>
                                <p className="font-semibold">$65.0M</p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium text-gray-500">Token Price</p>
                                <p className="font-semibold">$650</p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium text-gray-500">Available Tokens</p>
                                <p className="font-semibold">100,000</p>
                            </div>
                        </div>

                           <div className='flex gap-2'>
                            <button className="w-full mt-4 px-4 py-2 bg-[#f3f3f3] text-gray-700 font-medium rounded-md shadow hover:bg-[#ebebeb] transition cursor-pointer border" 
                            onClick={()=> showErrorToast("Sorry!, currently the details are not available")}>
                                <FontAwesomeIcon icon={faArrowUpFromBracket} className="mr-2" />
                            View Details
                        </button>
                         <button className=" w-full mt-4 px-4 py-2 bg-[#0a66ff] text-white font-medium rounded-md shadow hover:bg-[#0044cc] transition cursor-pointer" onClick={()=>showSuccessToast("Sure, we will notify you!")}>
                            <FontAwesomeIcon icon={faBell} className="mr-2" />
                            Notify Me
                        </button>
                        </div>
                    </div>
                </div>

                 <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                    <div>
                        <img
                            src="https://www.texasstandard.org/wp-content/uploads/2018/04/33491246922_bbabff8c4f_k.jpg"
                            alt="Aircraft"
                            className="w-full h-60 object-cover"
                        />
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Southwest Boeing 737</h3>
                                <p className="text-gray-500">Commercial Aircraft</p>
                            </div>
                            <div className='mt-2'>
                                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold text-sm ">Coming Soon</span>
                            </div>
                        </div>

                        {/* Token Details */}
                        <div className="grid grid-cols-3 gap-4 text-center text-gray-700 text-sm bg-[#f5f8ff] p-6 rounded-xl">
                            <div className="space-y-1">
                                <p className="font-medium text-gray-500">Total Value</p>
                                <p className="font-semibold">$45.2M</p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium text-gray-500">Token Price</p>
                                <p className="font-semibold">$452</p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium text-gray-500">Available Tokens</p>
                                <p className="font-semibold">15,420</p>
                            </div>
                        </div>

                        <div className='flex gap-2'>
                            <button className="w-full mt-4 px-4 py-2 bg-[#f3f3f3] text-gray-700 font-medium rounded-md shadow hover:bg-[#ebebeb] transition cursor-pointer border" onClick={()=> showErrorToast("Sorry!, currently the details are not available")}>
                                <FontAwesomeIcon icon={faArrowUpFromBracket} className="mr-2" />
                            View Details
                        </button>
                         <button className=" w-full mt-4 px-4 py-2 bg-[#0a66ff] text-white font-medium rounded-md shadow hover:bg-[#0044cc] transition cursor-pointer" onClick={()=>showSuccessToast("Sure, we will notify you!")}>
                            <FontAwesomeIcon icon={faBell} className="mr-2" />
                            Notify Me
                        </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default FeaturedAircraft;
