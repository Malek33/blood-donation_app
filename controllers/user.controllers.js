const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
//Register
exports.Register = async (req, res) => {
    try {
        const { email, password, name, phone } = req.body;
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(400).send({ message: "email should be unique" });
        }
        const newUser = new User({ ...req.body });
        // hashage password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        newUser.password = hashedPassword;
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, "bHo2uSC2wD", {
            expiresIn: "7d",
        });
        res.status(200).send({ message: "user created succ", newUser, token });
    } catch (err) {
        res.status(500).send(err);
    }
};
//Login
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).send({ message: "this account does not exist" });
        }
        const comparePass = await bcrypt.compare(password, findUser.password);
        if (!comparePass) {
            return res.status(400).send({ message: "wrong password" });
        }
        const token = jwt.sign({ id: findUser._id }, "bHo2uSC2wD", {
            expiresIn: "7d",
        });
        res.status(200).send({ message: "login succ", findUser, token });
    } catch (err) {
        res.status(500).send(err);
    }
};
