import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-13 py-5 bg-white shadow-md">
      {/* Logo Section */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-[#0a66ff]">AeroTokens</h1>
        <p className="text-sm text-gray-500">
          Tokenizing Airplanes on QIE Blockchain
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-5">
        <Link
          to="/"
          className="text-gray-700 font-medium px-3 py-1 rounded transition hover:text-[#0a66ff] hover:border hover:border-[#d9e6f6]"
        >
          Home
        </Link>
        <Link
          to="/marketPlace"
          className="text-gray-700 font-medium px-3 py-1 rounded transition hover:text-[#0a66ff] hover:border hover:border-[#d9e6f6]"
        >
          Marketplace
        </Link>
        <Link
          to="/tokenize"
          className="text-gray-700 font-medium px-3 py-1 rounded transition hover:text-[#0a66ff] hover:border hover:border-[#d9e6f6]"
        >
          Tokenize
        </Link>
        <Link
          to="/how-it-works"
          className="text-gray-700 font-medium px-3 py-1 rounded transition hover:text-[#0a66ff] hover:border hover:border-[#d9e6f6]"
        >
          How it works
        </Link>
      </div>

      {/* Wallet Button */}
      <div>
        <button className="flex items-center bg-[#0a66ff] text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
          <FontAwesomeIcon icon={faWallet} className="mr-2" />
          Connect Wallet
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
