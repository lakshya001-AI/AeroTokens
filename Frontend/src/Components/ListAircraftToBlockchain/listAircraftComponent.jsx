import React, { useState } from 'react';
import Navbar from '../MainPage/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlane, faIndustry, faCalendarAlt, faImage, faDollarSign,
    faCoins, faTag, faUserTie, faWallet, faPercent, faLock
} from '@fortawesome/free-solid-svg-icons';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import axios from 'axios';
import ToastMessage, { showSuccessToast, showErrorToast } from '../ToastMessage/toastMessage';
import { motion } from 'framer-motion';

const ListAircraftComponent = () => {
    const [formData, setFormData] = useState({
        aircraftName: "",
        manufacturer: "",
        yearOfManufacture: "",
        imageUrl: "",
        aircraftType: "",
        ownerName: "",
        marketValue: "",
        totalTokens: "",
        tokenPrice: "",
        lockPeriod: "",
        walletAddress: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [blockHash, setBlockHash] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updated = { ...prev, [name]: value };

            // Auto-calculate token price if marketValue or totalTokens changes
            const market = parseFloat(updated.marketValue);
            const tokens = parseFloat(updated.totalTokens);

            if (!isNaN(market) && !isNaN(tokens) && tokens !== 0) {
                updated.tokenPrice = (market / tokens).toFixed(2); // 2 decimal places
            } else {
                updated.tokenPrice = "";
            }

            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);

        setLoading(true);
        setSuccess(false);

        try {
            const res = await axios.post("http://localhost:5000/aircraftTokenizedDetails", { formData });
            console.log("Response:", res.data.data.blockHash);
            setBlockHash(res.data.data.blockHash);
            localStorage.setItem("blockHash", res.data.data.blockHash);

            // Simulate processing delay
            setTimeout(() => {
                setLoading(false);
                setSuccess(true);
                showSuccessToast("Aircraft Tokenization Successful!");
                setFormData({
                    aircraftName: "",
                    manufacturer: "",
                    yearOfManufacture: "",
                    imageUrl: "",
                    aircraftType: "",
                    ownerName: "",
                    marketValue: "",
                    totalTokens: "",
                    tokenPrice: "",
                    lockPeriod: "",
                    walletAddress: "",
                });
            }, 2000);
        } catch (error) {
            showErrorToast("Failed to submit the Details. Please check the Details.");
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex flex-col items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-lg font-semibold text-gray-700">Processing your request...</p>
                        <p className="text-sm text-gray-500 mt-1">Please wait while we tokenize your aircraft.</p>
                    </div>
                </div>
            )}

            {/* Success Popup */}
            {success && (
                <motion.div
                    className="fixed inset-0 backdrop-blur-md bg-white/30 flex flex-col items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl flex flex-col items-center w-[35%]"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* ✅ Green success circle */}
                        <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
                            ✓
                        </div>

                        {/* ✅ Success heading */}
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                            Tokenization Successful!
                        </h2>

                        {/* ✅ Subtext */}
                        <p className="text-gray-600 mb-4 text-center leading-relaxed">
                            Your aircraft has been successfully tokenized on the blockchain.
                        </p>

                        {/* ✅ Block hash section */}
                        <div className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 mb-5 shadow-inner text-center">
                            <p className="text-gray-800 text-sm font-medium mb-1">
                                Generated Block Hash:
                            </p>
                            <div className="font-mono text-xs text-blue-700 break-all bg-white rounded-md px-3 py-2 border border-blue-200 shadow-sm">
                                {blockHash || "N/A"}
                            </div>
                        </div>

                        {/* ✅ Close button */}
                        <button
                            onClick={() => setSuccess(false)}
                            className="bg-[#0a66ff] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}


            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex justify-center items-center py-2 px-4">
                <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-7xl border border-gray-100 mt-25">
                    <h1 className="text-4xl font-extrabold text-gray-800 text-center">
                        Tokenize Your Aircraft on <span className="text-[#0a66ff]">QIE Blockchain</span>
                    </h1>
                    <p className="text-gray-500 text-center mt-3 mb-8 text-lg max-w-3xl mx-auto">
                        Transform your aircraft into secure digital tokens with QIE Blockchain.
                        Provide accurate details to ensure transparency and verified ownership.
                    </p>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Aircraft Name */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 text-lg">
                            <FontAwesomeIcon icon={faPlane} className="text-gray-500 mr-3" />
                            <input
                                type="text"
                                name="aircraftName"
                                placeholder="Aircraft Name / Model"
                                className="flex-1 outline-none text-gray-700"
                                value={formData.aircraftName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Manufacturer */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 text-lg">
                            <FontAwesomeIcon icon={faIndustry} className="text-gray-500 mr-3" />
                            <input
                                type="text"
                                name="manufacturer"
                                placeholder="Manufacturer"
                                className="flex-1 outline-none text-gray-700"
                                value={formData.manufacturer}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Year of Manufacture */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 text-lg cursor-pointer">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500 mr-3" />
                            <input
                                type="text"
                                name="yearOfManufacture"
                                placeholder="Year of Manufacture"
                                className="flex-1 outline-none text-gray-700 cursor-pointer"
                                value={formData.yearOfManufacture}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Image URL */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 text-lg">
                            <FontAwesomeIcon icon={faImage} className="text-gray-500 mr-3" />
                            <input
                                type="url"
                                name="imageUrl"
                                placeholder="Upload Image (URL)"
                                className="flex-1 outline-none text-gray-700"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Aircraft Type */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 text-lg">
                            <FontAwesomeIcon icon={faPercent} className="text-gray-500 mr-3" />
                            <select
                                name="aircraftType"
                                className="flex-1 outline-none text-gray-700 bg-transparent"
                                value={formData.aircraftType}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Aircraft Type</option>
                                <option value="Business Jet">Business Jet</option>
                                <option value="Commercial Aircraft">Commercial Aircraft</option>
                                <option value="Cargo Aircraft">Cargo Aircraft</option>
                            </select>
                        </div>

                        {/* Owner Name */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 text-lg">
                            <FontAwesomeIcon icon={faUserTie} className="text-gray-500 mr-3" />
                            <input
                                type="text"
                                name="ownerName"
                                placeholder="Owner Name / Organization"
                                className="flex-1 outline-none text-gray-700"
                                value={formData.ownerName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Market Value */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 text-lg">
                            <FontAwesomeIcon icon={faDollarSign} className="text-gray-500 mr-3" />
                            <input
                                type="text"
                                name="marketValue"
                                placeholder="Aircraft Market Value (USD)"
                                className="flex-1 outline-none text-gray-700"
                                value={formData.marketValue}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Total Tokens */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 text-lg">
                            <FontAwesomeIcon icon={faCoins} className="text-gray-500 mr-3" />
                            <input
                                type="text"
                                name="totalTokens"
                                placeholder="Total Tokens to Mint"
                                className="flex-1 outline-none text-gray-700"
                                value={formData.totalTokens}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Price of Token */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 text-lg">
                            <FontAwesomeIcon icon={faTag} className="text-gray-500 mr-3" />
                            <input
                                type="text"
                                name="tokenPrice"
                                placeholder="Price of One Token (USD)"
                                className="flex-1 outline-none text-gray-700"
                                value={formData.tokenPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Lock Period */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 text-lg">
                            <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-3" />
                            <input
                                type="text"
                                name="lockPeriod"
                                placeholder="Lock Period (in months)"
                                className="flex-1 outline-none text-gray-700"
                                value={formData.lockPeriod}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Wallet Address */}
                        <div className="md:col-span-2 flex items-center border border-gray-300 rounded-lg px-3 py-3 text-lg">
                            <FontAwesomeIcon icon={faWallet} className="text-gray-500 mr-3" />
                            <input
                                type="text"
                                name="walletAddress"
                                placeholder="Owner Wallet Address"
                                className="flex-1 outline-none text-gray-700"
                                value={formData.walletAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Buttons */}
                        <div className="md:col-span-2 flex justify-center gap-6 mt-2">
                            <button
                                type="button"
                                className="bg-gray-100 text-gray-700 py-3 px-8 rounded-lg font-medium hover:bg-gray-200 transition cursor-pointer w-60"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-[#0a66ff] text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer w-60"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ListAircraftComponent;

