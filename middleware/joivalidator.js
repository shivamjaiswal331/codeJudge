const { isCelebrateError } = require('celebrate');

module.exports = () => (err, req, res, next) => {
    console.log("eeeeeee", err)
    if (isCelebrateError(err)) {
        return res.status(400).json({
            status: "failure",
            reason: err.message
        });
    }

    return next(err);
};