const mongoose = require("mongoose");

const connectDB = async () => {
    const URI = "mongodb+srv://malek:malek@cluster0.gnfc8.mongodb.net/mySecDatabase?retryWrites=true&w=majority"
    try {
        await mongoose.connect(URI);
        console.log("database is connected");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;
