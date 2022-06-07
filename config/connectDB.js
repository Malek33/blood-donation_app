const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://malek:malek@cluster0.gnfc8.mongodb.net/mySecDatabase?retryWrites=true&w=majority");
        console.log("database is connected");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;
