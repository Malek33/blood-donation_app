const Donor = require("../models/Donor");
const jwt = require("jsonwebtoken");

const isAuthDonor = async (req, res, next) => {
    try {
        // import du token from req.headers avec key : Authorization
        const token = req.headers["authorization"];
        // si pas de token
        if (!token) {
            return res
                .status(401)
                .send({ message: " you are not authorized 1 " });
        }
        // si token existe
        // on doit verifier si le token valide
        const decoded = jwt.verify(token, "bHo2uSC2wD");
        const donor = await Donor.findOne({ _id: decoded.id });
        if (!donor) {
            return res
                .status(401)
                .send({ message: " you are not authorized 2" });
        }
        req.donor = donor;
        next();
    } catch (error) {
        res.status(401).send({ message: "you are not authorized 3" });
    }
};
module.exports = isAuthDonor;