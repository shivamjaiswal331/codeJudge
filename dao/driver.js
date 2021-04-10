const DriverModel = require('../models/driver')


async function addDriver(driverDetails) {
    try {
        const addDriverRes = await DriverModel.create(driverDetails)
        return { value: addDriverRes }
    } catch (error) {
        return { error }
    }
}

async function saveDriverLocation(driverId, driverLocation) {
    try {
        const addLocationRes = await DriverModel.findOneAndUpdate({ id: driverId }, { $set: { location: { type: "Point", coordinates: [driverLocation.latitude, driverLocation.longitude] } } })
        return { value: addLocationRes }
    } catch (error) {
        return { error }
    }
}


async function getNearByDriver(location, range = 4) {
    try {
        const cabs = await DriverModel.find({
            location:
            {
                $near:
                {
                    $geometry: { type: "Point", coordinates: [location.latitude, location.longitude] },
                    // $minDistance: 1000,
                    $maxDistance: range * 1000
                }
            }
        }, { name: 1, phone_number: 1, car_number: 1, _id: 0 }).lean()

        return { value: cabs }
    } catch (error) {
        return { error }
    }
}

module.exports = {
    addDriver,
    saveDriverLocation,
    getNearByDriver
}