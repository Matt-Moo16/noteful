import React from 'react'
import './AddNote.css'
import {Link} from 'react-router-dom'
export default function AddNote(props) {
    const folders = props
    console.log(props)
    return (
        <>
            <form>
                <fieldset>
                    <legend>Create a Note:</legend>
                    <label htmlFor='note-title'>Name</label>
                    <input type='text' name='note-title'></input>
                    <br />
                    <label htmlFor='content'>Content</label>
                    <input type='text' name='content'></input>
                    <br /> 
                    <label htmlFor='folder'>Folder</label>
                    <select name='folder'>
                        {folders.folders.map(folder => 
                            <option value={folder.name}>{folder.name}</option>
                        )}
                    </select>
                    <br /> 
                    <input type='submit' value='Add Note' /> 
                </fieldset>
            </form>
            <Link onClick={() => props.routeProps.history.goBack()}>Back</Link>

        </>                
    )
}