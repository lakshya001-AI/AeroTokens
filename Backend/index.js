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

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
