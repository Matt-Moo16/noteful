import React from 'react'
import {Link} from 'react-router-dom'
import Note from './Note'

function NoteList(props) {
  const {notes=[]} = props
  return (
    <>
    <ul>
      {notes.map(note => 
        <li folderid = {note.folderId}>
          <Note 
          id = {note.id}
          name = {note.name}
          modified = {note.modified}
          />
        </li>
      )}    
    </ul>
    {notes.length > 0 && 
      <Link to='/note-new'>Add Note</Link>
    }
    </>
   )
}

export default NoteList 