const express = require('express');
const CORS = require('cors');
const dotenv = require('dotenv');
const connectMongoDB = require('./MongoDB/connectMongoDb');
const userModel = require('./MongoDB/schema');
const { registerAircraftDetails } = require('./BlockchainCode/contract');
const app = express();
dotenv.config();
connectMongoDB();

app.use(CORS());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/aircraftTokenizedDetails", async (req, res) => {
    try {
        const { formData } = req.body;

        const SmartContractFormData = {
            aircraftName: formData.aircraftName,
            ownerName: formData.ownerName,
            marketValue: parseInt(formData.marketValue), // in USD
            tokens: parseInt(formData.totalTokens),
            tokenPrice: parseInt(formData.tokenPrice), // price per token in USD
            walletAddress: formData.walletAddress
        };

        console.log("SmartContractFormData", SmartContractFormData);

        // console.log(formData);
        // res.send("Here we are going to test the function for the smart contract");

        // Deploy Smart Contract on QIE Network
        const contractAddress = await registerAircraftDetails(SmartContractFormData);
        const response = await userModel.create({
            aircraftName: formData.aircraftName,
            aircraftType: formData.aircraftType,
            yearOfManufacture: parseInt(formData.yearOfManufacture),
            manufacturer: formData.manufacturer,
            ownerName: formData.ownerName,
            imageUrl: formData.imageUrl,
            marketValue: parseInt(formData.marketValue),
            tokenPrice: parseInt(formData.tokenPrice),
            totalTokens: parseInt(formData.totalTokens),
            lockPeriod: parseInt(formData.lockPeriod),
            walletAddress: formData.walletAddress,
            blockHash: contractAddress.blockHash,
            blockNumber: parseInt(contractAddress.blockNumber),
            transactionHash: contractAddress.transactionHash,
        });
        console.log("MongoDB Response:", response);
        res.status(200).send({ message: "Aircraft tokenized and data saved successfully", data: response });
    } catch (error) {
        console.error("Error tokenizing aircraft:", error);
        res.status(500).json({ message: "Failed to tokenize aircraft", error: error.message });
    }
});

app.get("/getAllAircraftDetails", async (req, res) => {
    try {
        const response = await userModel.find();
        res.status(200).send({ message: "Aircraft details fetched successfully", data: response });
    } catch (error) {
        console.error("Error fetching aircraft details:", error);
        res.status(500).json({ message: "Failed to fetch aircraft details", error: error.message });
    }
});

app.post("/buyTokens", async (req, res) => {
  try {
    const { buyTokenData } = req.body;

    // 1. Find aircraft by ID
    const aircraft = await userModel.findOne({ _id: buyTokenData.aircraftId });
    if (!aircraft) {
      return res.status(404).json({ message: "Aircraft not found" });
    }

    // 2. Convert tokens to number (since frontend sends it as a string)
    const tokensToBuy = Number(buyTokenData.tokens);

    // 3. Check if enough tokens are available
    if (tokensToBuy > aircraft.totalTokens) {
      return res.status(400).json({
        message: `Only ${aircraft.totalTokens} tokens are available`,
      });
    }

    // 4. Subtract tokens and update
    const updatedTokens = aircraft.totalTokens - tokensToBuy;

    // 5. Update the record in database
    aircraft.totalTokens = updatedTokens;
    await aircraft.save();

    const responseObject = {
        updatedTokens: updatedTokens,
        aircraftName: aircraft.aircraftName,
        ownerWalletAddress: aircraft.walletAddress,
        ownerName: aircraft.ownerName,
        tokensBought: tokensToBuy,
        buyerWalletAddress: buyTokenData.buyerWalletAddress,
        buyerName: buyTokenData.buyerName,
    }

    // 7. Respond success
    res.status(200).send({ message: "Tokens purchased successfully", data: responseObject });
  } catch (error) {
    console.error("Error in /buyTokens:", error);
    res.status(500).json({
      message: "Failed to process token purchase",
      error: error.message,
    });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
