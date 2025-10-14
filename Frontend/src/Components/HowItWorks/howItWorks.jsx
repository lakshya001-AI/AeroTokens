import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faPlaneUp, faHandshake, faRocket, faArrowRight, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../MainPage/navbar'

const HowItWorks = () => {
  return (
    <div>  <Navbar />
      <div className='mt-24 px-8 md:px-20 py-16 bg-gradient-to-b from-gray-50 to-white'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-4'>
            How It <span className='text-[#0a66ff]'>Works</span>
          </h1>
          <p className='text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed'>
            We tokenize real-world aircraft into fractional tokens on the QIE Blockchain.
            Browse listings, review disclosures, and purchase tokens securely using your connected wallet.
          </p>

          <div className='flex justify-center gap-4 mt-8'>
            <button className="bg-[#0a66ff] text-white px-5 py-3 rounded-md font-medium shadow hover:bg-blue-700 transition cursor-pointer w-56 flex items-center justify-center gap-2">
              <span>Explore Now</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-white text-lg" />
            </button>

            <button className="bg-gray-50 text-gray-700 px-5 py-3 rounded-md font-medium border hover:bg-gray-100 transition cursor-pointer w-56 flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faFileAlt} className="text-gray-700 text-lg" />
              <span>Read Disclosures</span>
            </button>
          </div>
        </div>

        {/* Steps Section */}
        <div className='grid md:grid-cols-3 gap-10'>
          {/* Step 1 */}
          <div className='bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all'>
            <div className='flex items-center justify-center w-16 h-16 rounded-full bg-[#e8f1ff] mb-6 mx-auto'>
              <FontAwesomeIcon icon={faPlaneUp} className='text-[#0a66ff] text-3xl' />
            </div>
            <h2 className='text-2xl font-bold text-gray-800 text-center mb-3'>Tokenize Your Aircraft</h2>
            <p className='text-gray-600 text-center leading-relaxed'>
              Aircraft owners list their aircraft by submitting details like model, year, and value.
              AirQIE automatically deploys a smart contract on the QIE Blockchain,
              converting ownership into fractional tokens.
            </p>
          </div>

          {/* Step 2 */}
          <div className='bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all'>
            <div className='flex items-center justify-center w-16 h-16 rounded-full bg-[#e8f1ff] mb-6 mx-auto'>
              <FontAwesomeIcon icon={faHandshake} className='text-[#0a66ff] text-3xl' />
            </div>
            <h2 className='text-2xl font-bold text-gray-800 text-center mb-3'>Invest with QIE</h2>
            <p className='text-gray-600 text-center leading-relaxed'>
              Investors connect their QIE wallet and purchase aircraft tokens directly.
              Each token represents verifiable ownership on-chain, ensuring transparency
              and immutable records.
            </p>
          </div>

          {/* Step 3 */}
          <div className='bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all'>
            <div className='flex items-center justify-center w-16 h-16 rounded-full bg-[#e8f1ff] mb-6 mx-auto'>
              <FontAwesomeIcon icon={faRocket} className='text-[#0a66ff] text-3xl' />
            </div>
            <h2 className='text-2xl font-bold text-gray-800 text-center mb-3'>Earn & Trade Effortlessly</h2>
            <p className='text-gray-600 text-center leading-relaxed'>
              Revenue from leasing or operations is automatically distributed
              to token holders via smart contracts. Trade tokens anytime on QIEDEX
              with instant transfers and minimal fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks

