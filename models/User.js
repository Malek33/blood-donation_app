const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, enum: 'user', default: 'user' },
    bloodGroup: { type: String, required: true },
    phone: Number
});

module.exports = User = model("user", userSchema);
