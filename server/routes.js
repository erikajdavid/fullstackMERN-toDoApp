//create endpoints here
//endpoints responsible for the the frontend talking to the backend

const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");
const { ObjectId } = require("mongodb");

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
router.put("/todos/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id) //id because of line 38
    const { status } = req.body;

    const updatedTodo = await collection.updateOne({ _id }, { $set: { status: !status } })

    res.status(200).json(updatedTodo);
});

// DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id) //id because of line 42

    const deletedTodo = await collection.deleteOne({ _id });

    res.status(200).json(deletedTodo);
});

module.exports = router;