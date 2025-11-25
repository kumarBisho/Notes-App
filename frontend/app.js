// const { get } = require("mongoose");

const API_URL = 'http://localhost:3000/notes';

// fetch data from the API and display it on the webpage
async function getNotes(){
    const response = await fetch(`${API_URL}`);
    const notes = await response.json();
    const notesList = document.getElementById('notesList')
    notesList.innerHTML = '';
    notes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'note';
        div.innerHTML = `
        <h2>${note.title}</h2><p>${note.content}</p>
        <button onclick="editNote('${note._id}', '${note.title}', '${note.content}')">Edit</button>
        <button onclick="deleteNote('${note._id}')">Delete</button>

        <div id="edit-${note._id}" style="display:none;margin-top:10px;">
            <input type="text" id="edit-title-${note._id}" value="${note.title}" />
            <input type="text" id="edit-content-${note._id}" value="${note.content}" />
            <button onclick="updateNote('${note._id}')">Save</button>
            <button onclick="cancelEdit('${note._id}')">Cancel</button>
        </div>
        `;

        notesList.appendChild(div);
    });
}

// add a new note by sending data to the API
async function createNote(event){
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if(!title.trim() || !content.trim()){
        alert('Title and Content cannot be empty.');
        return;
    }

    await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ title, content}),
    });
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';


    // refresh the notes list
    getNotes();
}

function editNote(id){
document.getElementById(`edit-${id}`).style.display = 'block';
}

function cancelEdit(id){
    document.getElementById(`edit-${id}`).style.display = 'none';
}

async function updateNote(id){
    const title = document.getElementById(`edit-title-${id}`).value;
    const content = document.getElementById(`edit-content-${id}`).value;

    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ title, content}),
    })
    getNotes(); // refresh the notes list
}

async function  deleteNote(id) {
    await fetch(`${API_URL}/${id}`,{
        method: 'DELETE',
    });
    getNotes(); // refresh the notes list
}
// load notes when the page loads
getNotes();