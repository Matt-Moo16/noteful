import React from 'react'
import {NavLink, Link, Route, BrowserRouter as Router} from 'react-router-dom'
import AddFolder from './AddFolder'

export default function FolderList(props) {
    return (
        <>
            <ul>
                {props.folders.map((folder, i) => 
                    <li id={folder.id}
                    key={i}>
                        <NavLink to={`/folder/${folder.id}`}  activeStyle={{
    fontWeight: "bold",
    color: "blue"
  }}>
                        {folder.name}
                        </NavLink>
                    </li>
                )}
            </ul>
            <Link to='/folder/new'
            className='add'>Add Folder</Link>
        </>
    )
}