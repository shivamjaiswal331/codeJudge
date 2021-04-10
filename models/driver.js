const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const counterModel = require('./counter')

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const driverSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    phone_number: { type: Number, required: true, unique: true },
    license_number: { type: String, required: true, unique: true },
    car_number: { type: String, required: true, unique: true },
    id: { type: Number, unique: true },
    location: {
        type: pointSchema
    }
})



driverSchema.pre('save', async function (next) {
    try {
        let doc = this
        const uploadCounterRes = await counterModel.findByIdAndUpdate({ _id: "driver_id" }, { $inc: { seq: 1 } }, { upsert: true, setDefaultsOnInsert: true, new: true })

        if (!uploadCounterRes.seq) {
            throw Error("Failed to add user")
        }
        doc.id = uploadCounterRes.seq
        next()

    } catch (error) {
        return next(error);
    }
})

driverSchema.index({ location: '2dsphere' });


module.exports = mongoose.model("driver", driverSchema)