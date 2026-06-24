const express = require("express");
const mongoose = require("mongoose");
const { error } = require("node:console");
const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/studentDb')
.then(() => {
    console.log("mongodb connected");
    app.listen(3005, () => {
        console.log("Server running on port 3005");
    });
})
.catch(err => console.log(err));
const studentSchema = new mongoose.Schema({
    id: Number,
    name: String,
    course: String,
    dept: String
});
const Student = mongoose.model('Student', studentSchema);
app.get("/", (req, res) => {
    res.send("student management api");
});
app.post("/students", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({
            message: "student added successfully",
            student
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
app.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!student) {
            return res.status(404).json({
                message: 'student not found'
            });
        }
        res.json({
            message: 'student updated',
            student
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json({
            count: students.length,
            students
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
app.delete('/students/:id',async(req,res)=>{
    try{
        const student = await Student.findOneAndDelete({
id:req.params.id
        })
        if(!student){
            return res.status(404).json({message:'student not found'
            })}
        res.json({message:"student deleted",student})
    }catch (err)  {
    res.status(500).json({error:err.message})
}})