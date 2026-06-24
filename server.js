const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/studentsDb')
.then(()=>console.log("monogdb connected"))
.catch(err=>console.log(err))
const studentsSchema = new mongoose.Schema({
    id:
    name:String,
    course:String,
    dept:String

})
const Student = mongoose.model('student',studentsSchema)
app.get("/",(req,res)=>{
   
        res.send("student management api");
})