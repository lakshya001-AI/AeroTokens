import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import ListAircraftComponent from '../ListAircraftToBlockchain/listAircraftComponent';
import { Link } from 'react-router-dom';

const ExploreAircraftAndAdd = () => {
    return (
        <section className="relative flex flex-col md:flex-row justify-between px-8 md:px-10 py-27 bg-white">
            {/* Left Content */}
            <div className="flex-1 space-y-5">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    Fractional <span className="text-[#0a66ff]"> Aircraft Ownership</span> Made Simple
                </h1>
                <p className="text-gray-500 text-xl">
                    Explore verified aircraft tokens, track on-chain ownership, and invest securely through your wallet on the QIE Blockchain.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                    <Link to="/marketPlace">
                        <button className="flex items-center bg-[#0a66ff] text-white px-5 py-3 rounded-md font-medium shadow hover:bg-blue-700 transition cursor-pointer">
                            <FontAwesomeIcon icon={faPlane} className="mr-2" />
                            Explore Tokenized Aircraft
                        </button>
                    </Link>
                    <Link to="/tokenize">
                        <button
                            className="flex items-center bg-gray-50 text-gray-700 px-5 py-3 rounded-md font-medium border hover:bg-gray-100 transition cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faArrowUpFromBracket} className="mr-2" />
                            Tokenize Your Aircraft
                        </button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 bg-[#f5f8ff] p-6 rounded-xl mt-3 mr-7.5">
                    {[
                        { label: "Total Market Cap", value: "$128.4M" },
                        { label: "Aircraft Tokenized", value: "342" },
                        { label: "24h Volume", value: "$2.8M" },
                        { label: "Active Owners", value: "5,129" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-sm">{item.label}</p>
                            <h2 className="text-2xl font-semibold text-gray-800">{item.value}</h2>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Image */}
            <div className="flex-1">
                <img
                    src="/src/Assets/lufthnaseImage.jpg"
                    alt="Aircraft"
                    className="rounded-xl shadow-md w-full object-cover"
                />
            </div>
        </section>
    )
}

export default ExploreAircraftAndAdd;
