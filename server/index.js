const express =require('express');
const app = express();
const port = 3001;
app.use(express.json())
const cors=require('cors')
const corsOptions = {
    origin: 'http://localhost:3000/',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
  };
 
  app.use(cors(corsOptions));
const Book = require('./models/Books')
app.listen(port, () => {
    console.log(`localhost working in ${port} port success`)
})


//connect with mongo


const mongoose = require('mongoose');

mongoose.connect().then(() => {
    console.log("connect with mongo")
})

//post

app.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const Data = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(Data);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//get

app.get('/get/books',cors(corsOptions), async(req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json({ 'data is :': books })
    } catch (error) {
        res.status(500).json({ 'server': 'error' })
    }



})

//get by id

app.get('/get/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.status(200).json({ 'the book is :': book })
    } catch (error) {
        res.status(500).json({ 'server': 'error' })

    }

})
//put
app.put('/put/books/:id', async (req, res) => {
    try {
        //validation
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }


        const book = await Book.findByIdAndUpdate(req.params.id, req.body)
        if (!book) {
            return res.status(404).send({
                message: 'book not found'
            })
        } else {
            return res.status(200).send({
                message: 'book is updated'
            })
        }

    } catch (error) {
        res.status(500).json({ 'server': 'error' })

    }

})

//delete

app.delete('/delete/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) {
        res.status(401).json({ 'book': 'notfound' })
    } else {
        res.status(200).json({ 'book': 'deleted' })
    }
})
