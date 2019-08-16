const mongoose = require("mongoose");

const moneySchema = mongoose.Schema({
    userID: String,
    serverID: String,
    coins: Number,
    inventory: Array,
    surgerySkill: Number
});

module.exports = mongoose.model("Money", moneySchema);
