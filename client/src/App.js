import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import NoteForm from "./Components/NoteForm";
import NoteList from "./Components/NoteList";

function App() {

  const [notes, setNotes] = useState([]);

  useEffect( () => {
    getNotes();
  }, []);

  const getNotes = () => {
    axios.get("http://localhost:8000/api/notes")
      .then(res => {
        console.log(res);
        setNotes(res.data);
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <h1>Notes</h1>
      <hr />
      <NoteList notes={ notes } getNotes={ getNotes } />
      <NoteForm onNewNote={ getNotes } />
    </div>
  );
}

export default App;
