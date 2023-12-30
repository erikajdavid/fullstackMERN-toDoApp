//create endpoints here
//endpoints responsible for the the frontend talking to the backend

const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("todosdb").collection("todos");
    return collection;
}

// GET /todos
router.get("/todos", async (req, res) => {
    const collection = getCollection();
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos)
});

// POST /todos
// create  todo
router.post("/todos", async (req, res) => {
    const collection = getCollection();
    //console.log(req.body);

    const { todo } = req.body;

    const newTodo = await collection.insertOne({ todo, status: false})
    //false status means an incomplete task in our todo application



    res.status(201).json({ todo, status: false, _id: newTodo.insertedId })
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