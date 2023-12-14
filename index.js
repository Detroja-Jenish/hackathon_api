const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const Employee = require('./Employee.js')
const Project = require('./Project.js')
const Task = require('./Task.js')
// const connectionString ='mongodb://127.0.0.1:27017/Hackathon'
const connectionString = 'mongodb+srv://Jenish-Detroja:jenish_9917@cluster0.c06lr7u.mongodb.net/Demo?retryWrites=true&w=majority'
mongoose.connect(connectionString
)
.then(()=>{
    app = express()
    app.use(cors())
    app.use(bodyParser.json())

    //------------------------------ LogIn Api
    app.post('/login', async (req,res)=>{
        console.log("requested")
        console.log(req.body)
        const employee = await Employee.findOne({password: req.body.password, userName: req.body.userName})
        console.log(employee)
        if(employee !== null){
            console.log("aajjj")
            res.send({...employee, status:201})
        }else{
            res.send({msg:"hey", status:404})
        }
    })
    //------------------------------ AllEmployee
    app.get('/employee',async (req,res)=>{
        const employees = await Employee.find();
        // console.log(employees)
        res.send(employees)
    })

    app.get('/employee/:id', async (req,res)=>{
        const emp = await Employee.findOne({empId:req.params.id})
        res.send(emp)
    })

    //------------------------------ Project

    app.post("/project", async (req,res)=>{
        const project = new Project({
            projectName : req.body.projectName,
            teamLeader : req.body.teamLeader._id,
            teamMembers : req.body.teamMembers.map((emp)=>emp._id),
            allTasks : [],
            projectId : req.body.projectId,
            desc : req.body.desc
        })
        console.log(req.body)
        project.save()
        res.send({status: 201, message: "hey Vihaan"})
    })


    app.get("/project/:id", async (req,res)=>{// By Id project
        try{
            var project = await Project.findOne({projectId: req.params.id});
            project.allTasks = await Task.find({_id:{$in : project.allTasks}})
            project.teamMembers = await Employee.find({_id : {$in : project.teamMembers}})
            project.teamLeader = await Employee.findOne({_id : project.teamLeader})
            res.send(project)
            // res.send({...project, objs : allTasksObj})
        }catch(e){
            console.log(e);
            res.send({status: 404})
        }
    })
    

    app.post("/updateTask", async (req, res)=>{//update project task by id of project
        try{
            const task = await Task.findOne({_id : req.body._id})
            console.log(req.body);
            task.stage = req.body.stage
            task.save()
            res.send({status: 201})
        }catch(e){
            res.send({status : 404})
        }
    })


    //---------------------------------task
    app.post("/project/createTask/:id",async (req,res)=>{
        console.log(req.body)
        const task = new Task({
            taskName: req.body.taskName,
            desc: req.body.desc,
            labels: (req.body.labels !== null && req.body.labels !== undefined ? req.body.labels : []),
            timing: req.body.timing,
            workers: (req.body.workers !== null && req.body.workers !== undefined ? req.body.workers : null),
            taskId: req.body.taskId,
            stage: "toDos"
        })
        task.save();
        const project = await Project.findOne({projectId : req.params.id})
        if(project.allTasks === null){
            project.allTasks = [task]
        }else{
            project.allTasks.push(task)
        }
        task["status"] = 201
        // project.toDos.push(task.taskId)
        project.save()
        res.send(task)
    })

    app.put("/task/:id", async (req,res)=>{
        const task = await Task.findOne({taskId: req.body.id});
        task.stage = req.body.stage;
        task.save();
        res.send({...task, status:201})
    })

    app.get("/a", async (req,res)=>{
        const emp = await Employee.findOne({userName: "Vihaan"})
        emp["workingProjects"] = [1]
        emp.save()
        res.send("ok")
    })
    
    app.listen(3300, "0.0.0.0",()=>{
        console.log("hello")
    })
})