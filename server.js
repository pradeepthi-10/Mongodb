const express = require("express")
const mongoose = require("mongoose")
const { error } = require("node:console")
const app = express()
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/studentsDb')
.then(()=>console.log("monogdb connected"))
.catch(err=>console.log(err))
const studentsSchema = new mongoose.Schema({
    id:Number,
    name:String,
    course:String,
    dept:String

})
const Student = mongoose.model('student',studentsSchema)
app.get("/",(req,res)=>{
   
        res.send("student management api");
})
app.post("/students",async(req,res)=>{
    try{
        const student= new Student(req.body);
        await student.save();
        res.status(201).json({
            message:'student added sucessfully',student
        })
    }
    catch(err){
        res.status(500).json({error:err.message})

    }
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
app.put('/students/:id',async(req,res)=>{
    try{
        const student= await Student.findByIdAndUpdate(
        {id:req.body.params},
        req.body,{new:true}
        )
        if(!student){
            return req.status(404).json({message:"student not found"})
        }
    }
    catch(err){
     res.status(500).json({error:err.message})
    }
    res.json({message:'student updated',student})
})
app.delete('/student/:id',async{req,res}=>
{
    try{
        const student=await Student.findOneAndDelete({
            id:req.param
        })
        if(!student){
            return res.status(404).json({message:'student not found'})
        }
        res.json({message:"student deleted"},student)
    }
    catch(err)
}
)