const { check, validationResult } = require("express-validator");
exports.creationValidator = () => [
    check("name", "name is required").notEmpty(),
    //
    check("bloodGroup", "  your blood Group is required").notEmpty(),
    //
    check("medicalReport", "your medical Report is required").notEmpty(),
    //
    check("email", "email is required").notEmpty(),
    check("email", "should be email").isEmail(),
    //
    check("phone", "enter a valid phone number").notEmpty(),
];

exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
