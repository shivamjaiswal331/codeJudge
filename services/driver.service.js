const DriverDao = require('../dao/driver')



async function registerDriver(driverDetails, cb = () => { }) {
    try {

        const addDriverRes = await DriverDao.addDriver(driverDetails)
        if (addDriverRes.error) {
            cb(addDriverRes.error)
            return { error: addDriverRes.error }
        }
        const resObj = {
            "id": addDriverRes.value.id,
            "name": addDriverRes.value.name,
            "email": addDriverRes.value.email,
            "phone_number": addDriverRes.value.phone_number,
            "license_number": addDriverRes.value.license_number,
            "car_number": addDriverRes.value.car_number
        }


        cb(null, resObj)
        return { value: resObj }

    } catch (error) {
        cb(error)
        return { error }
    }
}

async function addDriverLocation(driverid, location, cb = () => { }) {
    try {
        const saveRes = await DriverDao.saveDriverLocation(driverid, location)
        if (saveRes.error) {
            throw saveRes.error
        }
        if (!saveRes.value) {
            const error = new Error("User not exists with such id")
            cb(error)
            return { error }
        }
        cb(null, saveRes.value)
        return { value: saveRes.value }

    } catch (error) {
        cb(error)
        return { error }
    }
}

async function getCabs(location, cb = () => { }) {
    try {
        const cabs = await DriverDao.getNearByDriver(location)
        console.log("hbhjsbhcdjsh", cabs, location)
        if (cabs.error) {
            throw cabs.error
        }
        if (cabs.value.length === 0) {
            const value = { "message": "No cabs available!" }
            cb(null, value)
            return { value }
        }
        cb(null, { available_cabs: cabs.value })
        return { available_cabs: cabs.value }
    } catch (error) {
        cb(error)
        return { error }
    }
}

module.exports = {
    registerDriver,
    addDriverLocation,
    getCabs
}