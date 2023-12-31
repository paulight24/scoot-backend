require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express()
const port = process.env.PORT;
app.use(cors());


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database!'));

subscriberRoutes = require('./routes/subscribers');
app.use('/subscribers', subscriberRoutes);

todoRoutes = require('./routes/todos');
app.use('/todos', todoRoutes);


var books = [
    {
        name: 'Rising Sun',
        author: 'Saint Paul'
    },
    {
        name: 'Reigin like a King',
        author: 'Chiedu Paul'
    },
    {
        name: 'Faith for exploits',
        author: 'Paul Chiedu'
    }
];

var Tdos = [
    {
        "id": 1,
        "description": "The input text contains a high proportion of negative words.",
        "dueDate": "2023-07-04T07:00:00.000Z",
        "priority": "1"
    },
    {
        "id": 2,
        "description": "The input text contains a high proportion of Neutral words.",
        "dueDate": "2023-07-04T07:00:00.000Z",
        "priority": "2"
    },
    {
        "dueDate": "2023-07-04T07:00:00.000Z",
        "description": "The input text contains a high proportion of Neutral words.",
        "priority": "3",
        "id": 3
    }
];

app.get('/books', (req, res) => {
    console.log(books);
    return res.send(books);
})

app.get('/Tdos', (req, res) => {
    console.log(Tdos);
    return res.send(Tdos);
})

app.use(express.json());
app.listen(port, () => console.log(`Example app listening on port ${port}`));