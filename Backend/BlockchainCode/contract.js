const Web3 = require("web3");

// QIE Testnet RPC (recommended)
const provider = `${process.env.PROVIDER_URL}`;  
const web3 = new Web3(provider);

// Replace with your deployed contract address
const contractAddress = `${process.env.CONTRACT_ADDRESS}`;

// Contract ABI
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_aircraftName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ownerName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_marketValue",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tokens",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tokenPrice",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			}
		],
		"name": "registerAircraft",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "aircraft",
		"outputs": [
			{
				"internalType": "string",
				"name": "aircraftName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ownerName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "marketValue",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenPrice",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAircraftDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

const privateKey = `${process.env.PRIVATE_KEY}`;
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

(async () => {
  const code = await web3.eth.getCode(contractAddress);
  console.log("Contract Code:", code);
})();

async function registerAircraftDetails(formData) {
    try {
        const receipt = await contract.methods.registerAircraft(
            formData.aircraftName,
            formData.ownerName,
            formData.marketValue,
            formData.tokens,
            formData.tokenPrice,
            formData.walletAddress
        ).send({
            from: account.address,
            gas: 800000,
            chainId: 1983 // QIE testnet or your custom chain ID
        });

        console.log("Aircraft registered successfully:", receipt);
        return receipt;
    } catch (error) {
        console.error("Error registering aircraft:", error);
    }
}

// Function to retrieve aircraft details (get)
async function getAircraftDetails() {
    try {
        const details = await contract.methods.getAircraftDetails().call();

        // Optional: Format nicely for readability
        const aircraftData = {
            aircraftName: details[0],
            ownerName: details[1],
            marketValue: details[2],
            tokens: details[3],
            tokenPrice: details[4],
            walletAddress: details[5]
        };

        console.log("Aircraft Details:", aircraftData);
        return aircraftData;
    } catch (error) {
        console.error("Error retrieving aircraft details:", error);
    }
}

// Export functions
module.exports = { registerAircraftDetails, getAircraftDetails };


