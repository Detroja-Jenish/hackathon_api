// const { default: mongoose } = require('mongoose')

const mongoose = require('mongoose')
const {Schema} = mongoose;
const schema = mongoose.Schema(
    {
        name: String,
        img : String,
        designation: String,
        address : String,
        salary : Number,
        degree : String,
        phone: String,
        email: String,
        userName: String,
        password: String,
        empId: String,
        id:String,
        workingProjects: [Number],
        finishedProjects:[Number],
    }
)

module.exports = mongoose.model('Employee', schema)