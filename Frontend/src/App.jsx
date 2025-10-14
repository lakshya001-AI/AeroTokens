import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './Components/MainPage/mainPage';
import MarketPlaceMainPage from './Components/MarketPlace/marketPlaceMainPage';
import HowItWorks from './Components/HowItWorks/howItWorks';
import ListAircraftComponent from './Components/ListAircraftToBlockchain/listAircraftComponent';
import { Toaster } from 'react-hot-toast';

const App = () =>{
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/marketPlace' element={<MarketPlaceMainPage/>}/>
        <Route path='/how-it-works' element={<HowItWorks/>}/>
        <Route path='/tokenize' element={<ListAircraftComponent/>}/>
      </Routes>
      <Toaster/>
    </BrowserRouter>
    </>
  )
}

export default App

