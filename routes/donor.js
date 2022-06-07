const { Register, Login } = require("../controllers/donor.controllers");
const express = require("express");
const isAuthAdmin = require("../middleware/isAuthAdmin");
const isAuth = require("../middleware/donorIsAuth");
const {
    registerValidator,
    loginValidator,
    validation,
} = require("../middleware/donor.validator");
const router = express.Router();
// testing route
router.get("/", (req, res) => {
    res.send({ message: "test routing" });
});
// register
router.post("/register", registerValidator(), validation, Register);

//login
router.post("/login", loginValidator(), validation, Login);

//current
router.get("/current", isAuth, (req, res) => {
    res.send({ message: "authorized", user: req.user });
});

//admin
router.get("/admin", isAuthAdmin, (req, res) => {
    res.send({ message: "welcome admin", user: req.user });
});

//router.post("/addproduct", isAuth, AddProduct);
module.exports = router;
