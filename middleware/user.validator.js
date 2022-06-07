const { check, validationResult } = require("express-validator");
exports.registerValidator = () => [
    check("name", "name is required").notEmpty(),
    check("email", "should be email").isEmail(),
    check("password", "password is required").notEmpty(),
    check("password", "enter a valid password").isLength({ min: 6 }),
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
