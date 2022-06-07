const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const donorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    medicalReport: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    type: { type: String, enum: 'donor', default: 'donor' },
    phone: {type: String, required: true},
});

module.exports = Donor = model("donor", donorSchema);
