import React from 'react'
import NoteList from './NoteList' 
import PropTypes from 'prop-types'


export default function Folder(props) {
    const {notes} = props 
    return (
        <>
        <NoteList notes={notes}/> 
        </>
    )
}

Folder.propTypes = {
    notes: PropTypes.array.isRequired
}