const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/Note');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// connect mongoodb

mongoose.connect('mongodb://localhost:27017/notesdb')
.then(()=> console.log('MongoDB connected'))
.catch(err => console.log(err));


// create a note
app.post('/notes', async (req, res)=>{
    const note = await Note.create(req.body);
    res.status(201).json(note);
});

// get all notes
app.get('/notes', async (req, res)=>{
    const notes = await Note.find().sort({createdAt: -1});
    res.json(notes);
});

// get single note by id
app.get('/notes/:id', async (req, res)=>{
    const note = await Note.findById(req.params.id);
    res.json(note);
});

//update a note by id
app.put('/notes/:id', async (req, res)=>{
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(note);
});

// delete a note by id
app.delete('/notes/:id', async (req, res)=>{
    await Note.findByIdAndDelete(req.params.id);
    res.status(204, {message: "Note deleted successfully"}).end();
})

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));