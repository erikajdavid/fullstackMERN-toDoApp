//create endpoints here
//endpoints responsible for the the frontend talking to the backend

const express = require("express");

const router = express.Router();

// GET /todos
router.get("/todos", (req, res) => {
    res.status(200).json({ message: "GET REQUEST TO /api/todos" })
});

// POST /todos
// create  todo
router.post("/todos", (req, res) => {
    res.status(201).json({ message: "POST REQUEST TO /api/todos" })
});

// PUT /todos/:id
// update todo (from complete to completed, or vice versa)
router.put("/todos/:id", (req, res) => {
    res.status(200).json({ message: "UPDATE REQUEST TO /api/todos" })
});

// DELETE /todos/:id
router.delete("/todos/:id", (req, res) => {
    res.status(200).json({ message: "DELETE REQUEST TO /api/todos" })
});

module.exports = router;