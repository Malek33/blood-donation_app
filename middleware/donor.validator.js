const { check, validationResult } = require("express-validator");
exports.registerValidator = () => [
    check("name", "name is required").notEmpty(),
    check("email", "should be email").isEmail(),
    //
    check("password", "password is required").notEmpty(),
    check("password", "enter a valid password").isLength({ min: 6 }),
    //
    check("bloodGroup", "  your blood Group is required").notEmpty(),
    //
    check("medicalReport", "your medical Report is required").notEmpty(),
    //
    check("phone", "enter a valid phone number").notEmpty(),
];
exports.loginValidator = () => [
    check("email", "should be email").isEmail(),
    check("password", "password is required").notEmpty(),
];
exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
