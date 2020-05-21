import React, { useState, useEffect } from 'react';
import axios from "axios";


const NoteList = (props) => {

  const [edit, setEdit] = useState(0);  

  const remove = (e, _id) => {
    e.preventDefault();
    console.log(_id);
    axios.delete(`http://localhost:8000/api/notes/${_id}`)
      .then(res => {
        console.log(res);
        props.getNotes();
      })
      .catch(err => console.log(err));
  }

  const thing = (e, _id) => {
    console.log(_id);
    setEdit(_id);
  }

  const update = (e, _id) => {
    setEdit(0);
    axios.put(`http://localhost:8000/api/notes/${_id}`, {text: e.target.value})
      .then(res => {
        console.log(res);
        props.getNotes();
      })
      .catch(err => console.log(err));
  }

  return (
    <ul>
      {props.notes.map( note =>
        <li key={ note._id } >
          {
            edit === note._id ?
            <textarea 
              autoFocus
              onBlur={ e => update(e, note._id) }
            >
              { note.text }
            </textarea> : 
            <span onClick={e => thing(e, note._id)}>
              { note.text }
            </span>
          }
          <a href="#" onClick={(e) => remove(e, note._id)}>&times;</a>
        </li>
      )}
    </ul>
  );

}

export default NoteList;