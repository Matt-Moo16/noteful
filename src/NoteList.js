import React from 'react'
import {Link} from 'react-router-dom'
import Note from './Note'
import PropTypes from 'prop-types'

export default function NoteList(props) {
  const {notes=[]} = props
  return (
    <>
    <ul>
      {notes.map((note, i) => 
        <li folderid = {note.folderId}
        key={i}>
          <Note 
          id = {note.id}
          name = {note.name}
          modified = {note.modified}
          />
        </li>
      )}    
    </ul>
    {notes.length >= 0 && 
      <button><Link to='/note-new'
      className='add'>Add Note</Link></button>
    }
    </>
   )
}

NoteList.propType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired, 
  modified: PropTypes.string
}