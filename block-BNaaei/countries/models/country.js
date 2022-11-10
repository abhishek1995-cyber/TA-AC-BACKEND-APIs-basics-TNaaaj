var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var countrySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    states: [
    {
        type: Schema.Types.ObjectId,ref: "State",
    }],
    continent: {
        type: String,
    },
    population: {
        type: Number},
    ethnicity: {
    type: String,
    },
    neighbouring: [
    {
        type: Schema.Types.ObjectId,
        ref: "Country",
    },
    ],
    area: {
        type: Number,
    },
});

var Country = mongoose.model("Country", countrySchema);
module.exports = Country;