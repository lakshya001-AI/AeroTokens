import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlane, faTag, faGaugeHigh, faDollarSign } from '@fortawesome/free-solid-svg-icons'

const MarketPlaceHeader = () => {
  return (
    <div>
        {/* Header */}
      <div className='text-center mb-10 mt-3.5'>
        <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight'>
          Explore Tokenized <span className='text-[#0a66ff]'>Aircraft</span>
        </h1>
        <p className='text-gray-500 text-lg mt-3'>
          Discover aircraft available as fractional tokens. Filter by make,
          range, and price to find your perfect match.
        </p>
      </div>

      {/* Search Filters */}
      <div className='flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6'>
        {/* Aircraft Name */}
        <div className='relative w-full md:w-1/5'>
          <FontAwesomeIcon icon={faPlane} className='absolute left-4 top-3 text-gray-400' />
          <input
            type='text'
            placeholder='Search aircraft, tail, token'
            className='w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-1  text-gray-700'
          />
        </div>

        {/* Type */}
        <div className='relative w-full md:w-1/5'>
          <FontAwesomeIcon icon={faTag} className='absolute left-4 top-3 text-gray-400' />
          <input
            type='text'
            placeholder='Type'
            className='w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-1  text-gray-700'
          />
        </div>

        {/* Range */}
        <div className='relative w-full md:w-1/5'>
          <FontAwesomeIcon icon={faGaugeHigh} className='absolute left-4 top-3 text-gray-400' />
          <input
            type='text'
            placeholder='Range'
            className='w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-1  text-gray-700'
          />
        </div>

        {/* Price */}
        <div className='relative w-full md:w-1/5'>
          <FontAwesomeIcon icon={faDollarSign} className='absolute left-4 top-3 text-gray-400' />
          <input
            type='text'
            placeholder='Price'
            className='w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-1  text-gray-700'
          />
        </div>

        {/* Search Button */}
        <button className='flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0a66ff] text-white font-semibold hover:bg-[#0044cc] transition-all shadow-md cursor-pointer'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Search
        </button>
      </div>
      
    </div>
  )
}

export default MarketPlaceHeader;
