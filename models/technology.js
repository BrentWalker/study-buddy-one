const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Technology = new Schema({
    language: {
        type: String
    }
});

module.exports = mongoose.model("Technology", Technology);