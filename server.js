const express = require("express");
const connectDB = require("./config/connectDB");
const patientRoutes = require("./routes/user");
const donorRoutes = require("./routes/donor");
const pubRoutes = require("./routes/pub");

var cors = require("cors");
// instanciation
const app = express();
app.use(cors());
require("dotenv").config();
app.use(express.json());
connectDB();
app.use("/api/user", patientRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/pub", pubRoutes);

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`server is running on ${PORT}`);
});
