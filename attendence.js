const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/studentDb")
.then(() => {
    console.log("mongodb connected");
    app.listen(3001, () => {
        console.log("Attendance server running on port 3001");
    });
})
.catch(err => console.log(err));
const attendanceSchema = new mongoose.Schema({
    id: Number,
    name: String,
    date: String,
    status: String
});
const Attendance = mongoose.model("Attendance", attendanceSchema);
app.get("/", (req, res) => {
    res.send("attendance management api");
});
app.post("/attendance", async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).json({
            message: "attendance added successfully",
            attendance
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
app.put("/attendance/:id", async (req, res) => {
    try {
        const attendance = await Attendance.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!attendance) {
            return res.status(404).json({
                message: "attendance not found"
            });
        }
        res.json({
            message: "attendance updated",
            attendance
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
app.get("/attendance", async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.json({
            count: attendance.length,
            attendance
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
app.delete("/attendance/:id", async (req, res) => {
    try {
        const attendance = await Attendance.findOneAndDelete({
            id: req.params.id
        });
        if (!attendance) {
            return res.status(404).json({
                message: "attendance not found"
            });
        }
        res.json({
            message: "attendance deleted",
            attendance
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});