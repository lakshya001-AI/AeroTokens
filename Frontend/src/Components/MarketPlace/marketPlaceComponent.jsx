import React, { useState , useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faBell } from '@fortawesome/free-solid-svg-icons';
import { showErrorToast, showSuccessToast } from '../ToastMessage/toastMessage';
import MarketPlaceHeader from './marketPlaceheader';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const MarketPlaceComponent = ({ aircraftDetails }) => {
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyData, setBuyData] = useState({ tokens: '', name: '', wallet: '' });
  const [qiePrice, setQiePrice] = useState(null); // 💰 current QIE price in USD
  const [equivalentQIE, setEquivalentQIE] = useState(0); // ⚖️ calculated value
  const [showProcessOverlay, setShowProcessOverlay] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [transactionSummary, setTransactionSummary] = useState(null);


  // Fetch QIE price from CoinGecko when component mounts
  useEffect(() => {
    const fetchQIEPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=qie&vs_currencies=usd'
        );
        setQiePrice(response.data.qie.usd);
      } catch (error) {
        console.error('Error fetching QIE price:', error);
        showErrorToast('Failed to fetch QIE price. Please try again.');
      }
    };

    fetchQIEPrice();
  }, []);

  const openDetailsModal = (aircraft) => {
    setSelectedAircraft(aircraft);
    setShowDetailsModal(true);
  };

  const openBuyModal = (aircraft) => {
    const isWalletConnected = sessionStorage.getItem("walletConnected");
    const walletAddress = sessionStorage.getItem("walletAddress");

    console.log("Aircraft to buy ✅✅✅:", aircraft);

    if (!isWalletConnected || !walletAddress) {
      showErrorToast("Please connect your wallet to proceed with the purchase.");
      return;
    }

    setSelectedAircraft(aircraft);
    setBuyData({ tokens: '', name: '', wallet: walletAddress });
    // Here we need to calculate the total number of QIE required to buy the tokens
    setShowBuyModal(true);
  };

  const handleBuySubmit = async () => {
    try {
      if (buyData.tokens === '' || buyData.name === '' || buyData.wallet === '') {
        showErrorToast("Please fill all the fields.");
        return;
      }

      setShowProcessOverlay(true);
      setProcessStep(1); // Start the visual flow

      const buyTokenData = {
        aircraftId: selectedAircraft._id,
        tokens: buyData.tokens,
        buyerName: buyData.name,
        buyerWalletAddress: buyData.wallet,
        qieRequired: equivalentQIE
      };

      // Step 1: Processing Data
      setTimeout(() => setProcessStep(2), 1500);

      // Step 2: Create Smart Contract
      setTimeout(() => setProcessStep(3), 3000);

      // Step 3: Token Transfer
      setTimeout(() => setProcessStep(4), 4500);

      // Send the request to backend
      const response = await axios.post("http://localhost:5000/buyTokens", { buyTokenData });

      if (response.status === 200) {
        const { message, data } = response.data;
        console.log("Buy Tokens Response:", data);

        setTimeout(() => {
          setProcessStep(5); // Success
          setTransactionSummary(data);
          showSuccessToast(message);
        }, 6000);
      } else {
        showErrorToast("Something went wrong. Please try again.");
        setShowProcessOverlay(false);
      }

    } catch (error) {
      console.error("Error in handleBuySubmit:", error);
      showErrorToast(error.response?.data?.message || "An unexpected error occurred.");
      setShowProcessOverlay(false);
    }
  };



  // 🔢 When user changes token count, recalculate QIE required
  useEffect(() => {
    if (!selectedAircraft || !qiePrice || !buyData.tokens) {
      setEquivalentQIE(0);
      return;
    }

    const tokenPriceUSD = selectedAircraft.tokenPrice; // price of one token in USD
    const totalUSD = tokenPriceUSD * parseFloat(buyData.tokens || 0);
    const qieRequired = totalUSD / qiePrice;
    setEquivalentQIE(qieRequired);
  }, [buyData.tokens, qiePrice, selectedAircraft]);

  return (
    <div className="mt-24 px-10 py-6 bg-gray-50 min-h-[88vh]">
      <MarketPlaceHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-7.5">
        {aircraftDetails.map((aircraft) => (
          <motion.div
            key={aircraft._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer w-110"
          >
            <div>
              <img
                src={aircraft.imageUrl}
                alt={aircraft.aircraftName}
                className="w-full h-60 object-cover"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{aircraft.aircraftName}</h3>
                  <p className="text-gray-500">{aircraft.aircraftType}</p>
                </div>
                <div className='mt-2'>
                  <span className="bg-green-200 text-black px-3 py-1 rounded-full font-semibold text-sm">Active</span>
                </div>
              </div>

              <div className="grid grid-cols-3 text-center text-gray-700 text-sm bg-[#f5f8ff] py-2 rounded-xl px-3">
                <div className="space-y-1">
                  <p className="font-medium text-gray-500">Total Value</p>
                  <p className="font-semibold">${aircraft.marketValue}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-500">Token Price</p>
                  <p className="font-semibold">${aircraft.tokenPrice}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-500">Available Tokens</p>
                  <p className="font-semibold">{aircraft.totalTokens}</p>
                </div>
              </div>

              <div className='flex gap-2'>
                <button
                  className="w-full mt-4 px-4 py-2 bg-[#f3f3f3] text-gray-700 font-medium rounded-md shadow hover:bg-[#ebebeb] transition cursor-pointer border"
                  onClick={() => openDetailsModal(aircraft)}
                >
                  <FontAwesomeIcon icon={faArrowUpFromBracket} className="mr-2" />
                  View Details
                </button>

                <button
                  className="w-full mt-4 px-4 py-2 bg-[#0a66ff] text-white font-medium rounded-md shadow hover:bg-[#0044cc] transition cursor-pointer"
                  onClick={() => openBuyModal(aircraft)}
                >
                  <FontAwesomeIcon icon={faBell} className="mr-2" />
                  Buy Tokens
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      

      {/* AnimatePresence handles mounting/unmounting animations */}
      <AnimatePresence>
        {/* Details Modal */}
        {showDetailsModal && selectedAircraft && (
          <motion.div
            className="fixed inset-0 backdrop-blur-lg bg-white/20 flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 w-3xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* ❌ Close button */}
              <button
                className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                onClick={() => setShowDetailsModal(false)}
              >
                ×
              </button>

              {/* 🛩️ Header */}
              <div className="flex flex-col items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight text-center">
                  {selectedAircraft.aircraftName}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Tokenized on <span className="text-[#0a66ff] font-medium">QIE Blockchain</span>
                </p>
              </div>

              {/* 📄 Aircraft Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-700">
                <div className="flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="text-lg font-semibold">{selectedAircraft.aircraftType}</p>
                </div>

                <div className="flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500">Manufacturer</p>
                  <p className="text-lg font-semibold">{selectedAircraft.manufacturer}</p>
                </div>

                <div className="flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500">Year of Manufacture</p>
                  <p className="text-lg font-semibold">{selectedAircraft.yearOfManufacture}</p>
                </div>

                <div className="flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500">Owner</p>
                  <p className="text-lg font-semibold">{selectedAircraft.ownerName}</p>
                </div>

                <div className="flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500">Market Value</p>
                  <p className="text-lg font-semibold text-green-600">${selectedAircraft.marketValue}</p>
                </div>

                <div className="flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500">Token Price</p>
                  <p className="text-lg font-semibold text-blue-600">${selectedAircraft.tokenPrice}</p>
                </div>

                <div className="flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500">Total Tokens</p>
                  <p className="text-lg font-semibold">{selectedAircraft.totalTokens}</p>
                </div>

                <div className="flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500">Lock Period</p>
                  <p className="text-lg font-semibold">{selectedAircraft.lockPeriod} months</p>
                </div>

                <div className="md:col-span-2 flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500">Wallet Address</p>
                  <p className="font-mono text-sm text-blue-700 break-all bg-white rounded-md px-3 py-2 border border-blue-100 shadow-inner">
                    {selectedAircraft.walletAddress}
                  </p>
                </div>
                <div className="md:col-span-2 flex flex-col bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500">Transaction Hash</p>
                  <p className="font-mono text-sm text-blue-700 break-all bg-white rounded-md px-3 py-2 border border-blue-100 shadow-inner">
                    {selectedAircraft.transactionHash}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Buy Tokens Modal */}
        <AnimatePresence>
          {showBuyModal && selectedAircraft && (
            <motion.div
              className="fixed inset-0 backdrop-blur-md bg-white/30 flex flex-col items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-11/12 md:w-2/3 lg:w-1/3 bg-white/40 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-2xl p-10"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 hover:scale-110 transition-transform text-lg font-semibold mb-1.5"
                  onClick={() => setShowBuyModal(false)}
                >
                  ✕
                </button>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center mt-6.5">
                  Buy Tokens – <span className="text-[#0a66ff]">{selectedAircraft.aircraftName}</span>
                </h2>

                {/* Form */}
                <div className="space-y-5">
                  {/* Token Input */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Number of Tokens
                    </label>
                    <input
                      type="number"
                      value={buyData.tokens}
                      onChange={(e) => setBuyData({ ...buyData, tokens: e.target.value })}
                      placeholder="Enter tokens..."
                      className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-1 transition"
                    />
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={buyData.name}
                      onChange={(e) => setBuyData({ ...buyData, name: e.target.value })}
                      placeholder="Enter your name..."
                      className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-1 transition"
                    />
                  </div>

                  {/* Wallet Input */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      value={buyData.wallet}
                      onChange={(e) => setBuyData({ ...buyData, wallet: e.target.value })}
                      placeholder="Enter your wallet address..."
                      className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-1 transition"
                    />
                  </div>

                  {/* here i want to show the equivalent QIE which user will pay to buy the Tokens */}
                   {/* Equivalent QIE */}
                  {buyData.tokens && qiePrice && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm"
                    >
                      {/* Decorative gradient blur circle */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(10,102,255,0.1),_transparent_70%)]"></div>

                      {/* Header */}
                      <div className="relative z-10 flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-600 tracking-wide">
                          💰 Estimated Cost in QIE
                        </p>
                        <span className="text-xs bg-blue-100 text-[#0a66ff] px-2 py-0.5 rounded-full font-semibold">
                          Live Rate
                        </span>
                      </div>

                      {/* Main Amount */}
                      <div className="relative z-10 mt-3">
                        <h3 className="text-3xl font-extrabold text-[#0a66ff] tracking-tight">
                          {equivalentQIE.toFixed(2)} <span className="text-base text-gray-600 font-semibold">QIE</span>
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                          1 QIE = <span className="font-medium text-gray-700">${qiePrice}</span>
                        </p>
                      </div>

                      {/* Subtext */}
                      <div className="relative z-10 mt-3">
                        <p className="text-xs text-gray-500 italic">
                          *Based on current QIE market price from CoinGecko.
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {/* Action Button */}
                  <motion.button
                    className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#0a66ff] to-[#0044cc] text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleBuySubmit}
                  >
                    Proceed to Purchase
                  </motion.button>
                </div>

                {/* Decorative Bottom Glow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-2 bg-gradient-to-r from-[#0a66ff] to-[#0044cc] blur-xl opacity-40 rounded-full"></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔄 Transaction Processing Overlay */}
        {/* 🔄 Transaction Processing Overlay */}
        <AnimatePresence>
          {showProcessOverlay && (
            <motion.div
              className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 w-130 text-center flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                {processStep < 5 ? (
                  <>
                    <h2 className="text-3xl font-bold text-[#0a66ff] mb-6">Processing Transaction</h2>
                    <ul className="space-y-5 text-gray-700 text-center">
                      <li className={`flex items-center gap-2 ${processStep >= 1 ? 'text-blue-600 font-semibold' : 'text-gray-400'} text-xl`}>
                        <span>⏳</span> Step 1: Processing purchase data
                      </li>
                      <li className={`flex items-center gap-2 ${processStep >= 2 ? 'text-blue-600 font-semibold' : 'text-gray-400'} text-xl`}>
                        <span>🧾</span> Step 2: Creating smart contract
                      </li>
                      <li className={`flex items-center gap-2 ${processStep >= 3 ? 'text-blue-600 font-semibold' : 'text-gray-400'} text-xl`}>
                        <span>🔁</span> Step 3: Transferring tokens
                      </li>
                      <li className={`flex items-center gap-2 ${processStep >= 4 ? 'text-blue-600 font-semibold' : 'text-gray-400'} text-xl`}>
                        <span>✅</span> Step 4: Finalizing transaction
                      </li>
                    </ul>

                    {/* Animated Loader */}
                    <motion.div
                      className="mt-8 w-9 h-9 border-4 border-[#0a66ff] border-t-transparent rounded-full mx-auto animate-spin"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                  </>
                ) : (
                  transactionSummary && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Purchase Successful!</h2>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 w-full max-w-md mx-auto text-gray-700 space-y-6">
                          {/* Owner Section */}
                          <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500">Owner</p>
                            <p className="font-semibold text-gray-900">{transactionSummary.ownerName}</p>
                            <p className="font-mono text-xs text-blue-700 break-all">{transactionSummary.ownerWalletAddress}</p>
                          </div>

                          {/* Token Transfer Arrow */}
                          <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-500 mb-1">Tokens Transferred</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-[#0a66ff]">{transactionSummary.tokensBought}</span>
                              <svg
                                className="w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                              </svg>
                            </div>
                          </div>

                          {/* Buyer Section */}
                          <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500">Buyer</p>
                            <p className="font-semibold text-gray-900">{transactionSummary.buyerName}</p>
                            <p className="font-mono text-xs text-blue-700 break-all">{transactionSummary.buyerWalletAddress}</p>
                          </div>
                        </div>
                      <button
                        className="mt-6 px-6 py-2 rounded-lg bg-[#0a66ff] text-white font-semibold shadow hover:bg-[#0044cc] transition"
                        onClick={() => {
                          setShowProcessOverlay(false);
                          setShowBuyModal(false);
                          setTransactionSummary(null);
                        }}
                      >
                        Close
                      </button>
                    </motion.div>
                  )
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
};

export default MarketPlaceComponent;
