import React from 'react'
import {Link} from 'react-router-dom'

export default function AddFolder(props) {
    return (
        <>
            <form>
                <fieldset>
                    <legend>Create a Folder:</legend>
                    <label htmlFor='folder-name'>Folder Name </label>
                    <input type='text' name='folder-name'></input>
                    <br />
                    <input type='submit' value='Add Folder'></input>
                </fieldset>
            </form>
            <Link onClick={() => props.history.goBack()}>Back</Link>
        </>
    )
}