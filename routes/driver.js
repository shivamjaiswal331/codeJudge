var express = require('express')
const router = express.Router()
const schemas = require('../requestvalidator/driver')
const { celebrate } = require('celebrate');
const JoiValidator = require('../middleware/joivalidator')
const DriverService = require('../services/driver.service')

router.post('/driver/register/', [celebrate(schemas.registerDriver), JoiValidator()], function (req, res) {
    const { name, email, phone_number, license_number, car_number } = req.body

    DriverService.registerDriver({ name, email, phone_number, license_number, car_number }, function (error, value) {
        console.log("rrrrrr", error, value)
        if (error) {
            res.status(400).json({ status: "failure", reason: error.message })
        } else {
            res.status(201).json(value)
        }
    })
})

router.post('/driver/:id/sendLocation', [celebrate(schemas.saveDriverLocation), JoiValidator()], function (req, res) {
    const driverId = req.params.id
    const { latitude, longitude } = req.body

    DriverService.addDriverLocation(driverId, { latitude, longitude }, function (error, value) {

        if (error) {
            res.status(400).json({ status: "failure", reason: error.message })
        } else {
            res.status(202).json({ status: "success", value })
        }
    })
})

router.post('/passenger/available_cabs/', [celebrate(schemas.saveDriverLocation), JoiValidator()], function (req, res) {
    const { latitude, longitude } = req.body

    DriverService.getCabs({ latitude, longitude }, function (error, value) {
        console.log("errr amd value", error, value)
        if (error) {
            res.status(400).json({ status: "failure", reason: error.message })
        } else {
            res.status(200).json(value)
        }
    })
})



module.exports = router