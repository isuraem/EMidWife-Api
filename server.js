// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

//Routes
var appController = require("./app/app");

// Loading environment variables
require("dotenv").config({
	path: path.resolve(__dirname, ".env"),
});

// Constants
const PORT = 8070;
const URL = process.env.MONGODB_URL;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;

// Event listener for successful MongoDB connection
connection.once("open", () => {
	console.log("MongoDB connection successful!");
});

// use routes (if applicable) appController
app.use("/api", appController);

// use routes (if applicable) appController
app.use("/api/check", (req, res) => {
	return res.status(200).json({
		message: "This is checking port"
	})
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});