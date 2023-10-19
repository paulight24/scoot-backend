const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Todo = require('../models/todos')

// GETTING ROUTE
router.get('/', async (req, res) => {
    // res.send('Getting todos');
    try {
        const todos = await Todo.find();
        res.send(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// GET ONE ROUTE
router.get('/:id', getTodo, (req, res) => {
    res.send(res.todo)
})

// ADDING A NEW ROUTE 
router.post('/', async (req, res) => {
    console.log('req: ', req);
    const todo = new Todo({
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
    })

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// UPDATING ROUTE
router.patch('/:id', getTodo, async (req, res) => {
    console.log('req: ', req.body);
    const todo = new Todo({
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
    })

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// DELETING ROUTE
router.delete('/:id', getTodo, async (req, res) => {
    try {
        await res.todo.remove();
        res.json({ message: 'Deleted todo' })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

async function getTodo(req, res, next) {
    let todo;
    try {
        todo = await Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: 'Cannont find todo' })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

    res.todo = todo
    next()
}

module.exports = router

