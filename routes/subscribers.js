const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscribers')

// GETTING ROUTE
router.get('/', async (req, res) => {
    // res.send('Getting subscribers');
    try {
        const subscribers = await Subscriber.find();
        res.send(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// GET ONE ROUTE
router.get('/:id', getSubscriber, (req, res) => {
    res.send(res.subscriber)
})

// ADDING A NEW ROUTE 
router.post('/', async (req, res) => {
    console.log('req: ', req);
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// UPDATING ROUTE
router.patch('/:id', getSubscriber, async (req, res) => {
    console.log('req: ', req.body);
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// DELETING ROUTE
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({ message: 'Deleted subscriber' })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannont find subscriber' })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

    res.subscriber = subscriber
    next()
}

module.exports = router