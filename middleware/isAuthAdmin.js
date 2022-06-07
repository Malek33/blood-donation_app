const jwt = require("jsonwebtoken");
const Donor = require("../models/Donor");

const isAuthAdmin = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const donor = await Donor.findById(decoded.id);
        if (!donor) {
            return res.status(401).send({ message: "not authorized" });
        }
        if (donor.role !== "admin") {
            return res.status(401).send({ message: "not authorized" });
        }
        req.donor = donor;
        next();
    } catch (err) {
        res.status(500).send(err);
    }
};
module.exports = isAuthAdmin;
