const mongoose = require('mongoose')
const Employee = require('./Employee')
const Task = require('./Task')
const {Schema} = mongoose
const schema = new mongoose.Schema({
    projectName: String,
    teamLeader : {type: Schema.Types.ObjectId, default: null, ref:'Employee'},
    desc: String,
    teamMembers : [{type: Schema.Types.ObjectId, default: [], ref:'Employee'}],
    allTasks: [{type: Schema.Types.ObjectId, default: [], ref:'Task'}], //we can do this
    // toDos:{type: [Task.schema], default: []},
    // inProgress: {type: [Task.schema], default: []},
    // inReview:{type: [Task.schema], default: []},
    // completed: {type: [Task.schema], default: []},
})

module.exports = mongoose.model("Project",schema)