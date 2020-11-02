import React from 'react'
import {Link} from 'react-router-dom'
import NoteList from './NoteList' 


export default function Folder(props) {
    const {notes} = props 
    return (
        <>
        <NoteList notes={notes}/> 
        </>
    )
}
