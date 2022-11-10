
var mongoose = require("mongoose");
var stateSchema = new mongoose.Schema({
    name: {
    type: String,
    },
    countryname: {
    type: String,
    },
    country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    },
    population: {
        type: Number,
        require: true,
    },
    area: {
        type: Number,
    },
    neighbouringState: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
    },
    ],
});
var State = mongoose.model("State", stateSchema);
module.exports = State;