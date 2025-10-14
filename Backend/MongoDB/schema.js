const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    aircraftName: String,
    aircraftType: String,
    yearOfManufacture: Number,
    manufacturer: String,
    ownerName: String,
    imageUrl: String,
    marketValue: Number,
    tokenPrice: Number,
    totalTokens: Number,
    lockPeriod: Number,
    walletAddress: String,
    blockHash: String,
    blockNumber: Number,
    transactionHash: String,
});

const userModel = mongoose.model("AircraftTokenizedData", userSchema);

module.exports = userModel;