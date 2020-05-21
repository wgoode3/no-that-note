import React, { useState, useEffect } from 'react';
import axios from "axios";


const NoteForm = (props) => {

  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});

  const addNote = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/notes", {text})
      .then(res => {
        console.log(res);
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          setText("");
          props.onNewNote();
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={ addNote }>
      <div>
        <textarea 
          placeholder="Your note here..."
          rows="5"
          cols="50"
          onChange={ e => setText(e.target.value) }
          value={ text }
        >
        </textarea>
        { errors.text ? <p>{ errors.text.message }</p> : "" }
      </div>
      <input type="submit" />
    </form>
  );
}

export default NoteForm;