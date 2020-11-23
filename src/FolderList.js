import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import PropTypes from 'prop-types'

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
                <button><Link to='/folder/new'
                className='add'>Add Folder</Link></button>
            </>
        )
 
}

FolderList.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string
}