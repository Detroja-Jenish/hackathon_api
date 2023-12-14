const mongoose = require("mongoose")
const Employee = require("./Employee")
const {Schema} = mongoose
const schema = new mongoose.Schema({
    taskName: String,
    desc: String,
    labels: [String],
    timing: String,
    workers: [{type: Schema.Types.ObjectId, default: [], ref:'Employee'}],
    taskId: Number,
    stage: String
})

module.exports = mongoose.model("Task", schema)