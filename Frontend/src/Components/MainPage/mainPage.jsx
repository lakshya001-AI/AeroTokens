import React from 'react'
import Navbar from './navbar';
import MainPageIntroComponent from './mainPageIntroComponent';
import ExploreAircraftAndAdd from './exploreAircraftandAdd';
import FeaturedAircraft from './featuredAircraft';
import FooterElement from './footerElement';

const MainPage = () => {
    return (
        <>
            <div>
                <Navbar />
                <MainPageIntroComponent/>
                <ExploreAircraftAndAdd/>
                <FeaturedAircraft/>
                <FooterElement/>
            </div>
        </>
    )
}

export default MainPage;
