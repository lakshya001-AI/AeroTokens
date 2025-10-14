import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import ToastMessage, { showErrorToast, showSuccessToast } from '../ToastMessage/toastMessage';

const Navbar = () => {
  const [walletConnected, setWalletConnected] = useState(sessionStorage.getItem("walletConnected") === "true");
  // const handleConnectWallet = () => {
  //   showSuccessToast("Wallet connected successfully!");
  //   sessionStorage.setItem("walletConnected", "true");
  //   setWalletConnected(true);
  // }
  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      showErrorToast("MetaMask is not installed!");
      return;
    }

    try {
      // Request wallet connection
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];

      // Define QIE testnet parameters
      const qieNetwork = {
        chainId: "1983", // 1983 in hexadecimal
        chainName: "QIE Testnet",
        nativeCurrency: {
          name: "QIE",
          symbol: "QIE",
          decimals: 18,
        },
        rpcUrls: ["https://rpc1testnet.qie.digital", "https://testnetqierpc1.digital/"],
        blockExplorerUrls: ["https://testnet.qie.digital/"],
      };

      // Try switching to QIE testnet
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: qieNetwork.chainId }],
      }).catch(async (switchError) => {
        // If the chain is not added, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [qieNetwork],
          });
        } else {
          throw switchError;
        }
      });

      showSuccessToast(`QIE Wallet connected`);
      sessionStorage.setItem("walletConnected", "true");
      sessionStorage.setItem("walletAddress", account);
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to connect wallet!");
    }
  };
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
        <button className="flex items-center bg-[#0a66ff] text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer" onClick={handleConnectWallet}>
          <FontAwesomeIcon icon={faWallet} className="mr-2" />
          {walletConnected ? "Wallet Connected" : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
