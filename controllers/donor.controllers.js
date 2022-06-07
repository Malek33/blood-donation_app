const Donor = require("../models/Donor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
//Register
exports.Register = async (req, res) => {
    try {
        const { name, email, password, bloodGroup, medicalReport, phone } = req.body;
        const findDonor = await Donor.findOne({ email });
        if (findDonor) {
            return res.status(400).send({ message: "email should be unique" });
        }
        const newDonor = new Donor({ ...req.body });
        // hashage password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        newDonor.password = hashedPassword;
        await newDonor.save();
        const token = jwt.sign({ id: newDonor._id }, "bHo2uSC2wD", {
            expiresIn: "7d",
        });
        res.status(200).send({ message: "Donor created succ", newDonor, token });
    } catch (err) {
        res.status(500).send(err);
    }
};
//Login
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findDonor = await Donor.findOne({ email });
        if (!findDonor) {
            return res.status(400).send({ message: "this account does not exist" });
        }
        const comparePass = await bcrypt.compare(password, findDonor.password);
        if (!comparePass) {
            return res.status(400).send({ message: "wrong password" });
        }
        const token = jwt.sign({ id: findDonor._id }, "bHo2uSC2wD", {
            expiresIn: "7d",
        });
        res.status(200).send({ message: "login succ", findDonor, token });
    } catch (err) {
        res.status(500).send(err);
    }
};
