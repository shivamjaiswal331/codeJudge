const { Joi } = require('celebrate');



const countDigits = (value, helpers) => {

    const str = value.toString()

    if (str.length !== 10) {
        return helpers.error('any.invalid');
    }

    return value;
};

const registerDriver = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone_number: Joi.number().required().custom(countDigits, 'custom validation'),
        license_number: Joi.string().required(),
        car_number: Joi.string().required()
    })
}


const saveDriverLocation = {
    body: Joi.object().keys({
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
    })
}




module.exports = {
    registerDriver,
    saveDriverLocation
}