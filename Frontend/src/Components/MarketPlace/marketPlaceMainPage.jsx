import React, { useState } from 'react'
import Navbar from '../MainPage/navbar'
import MarketPlaceComponent from './marketPlaceComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneCircleExclamation } from '@fortawesome/free-solid-svg-icons' // or use faPlane if you prefer
import ToastMessage, { showSuccessToast, showErrorToast } from '../ToastMessage/toastMessage';
import axios from 'axios'
import { useEffect } from 'react'

const MarketPlaceMainPage = () => {
  const [displayComponent, setDisplayComponent] = useState(false);
  const [aircraftDetails, setAircraftDetails] = useState([]);
   useEffect(() => {
     const fetchAircraftDetails = async () => {
       try {
         const response = await axios.get("http://localhost:5000/getAllAircraftDetails");

         console.log("Aircraft Details:", response.data);

         // ✅ Correct condition
         if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
           setDisplayComponent(true);
          setAircraftDetails(response.data.data);
         } else {
           showErrorToast("No aircraft details found.");
         }

       } catch (error) {
         console.error("Error fetching aircraft details:", error);
         showErrorToast("Failed to fetch aircraft details. Please try again later.");
       }
     };

     fetchAircraftDetails();
   }, []);
  return (
    <div>
      <Navbar />

      {displayComponent ? (
        <MarketPlaceComponent aircraftDetails={aircraftDetails}/>
      ) : (
        <div className="h-227 flex flex-col items-center justify-center text-center py-40 bg-gray-50 ">
          <div className="bg-white shadow-md rounded-2xl p-10 border border-gray-200">
            <FontAwesomeIcon
              icon={faPlaneCircleExclamation}
              className="text-[#0a66ff] text-5xl mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Aircraft Available
            </h2>
            <p className="text-gray-600 mb-6">
              Currently, there are no aircraft available for investment.
              <br /> Please check back soon for upcoming opportunities.
            </p>
            <button
              onClick={() => showErrorToast("No aircraft available at the moment. Please try again later.")}
              className="px-6 py-2 bg-[#0a66ff] text-white rounded-full hover:bg-[#0044cc] transition cursor-pointer"
            >
              Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MarketPlaceMainPage
