import React from 'react'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import AddFolder from './AddFolder'


export default function Sidebar(props) {
    return (
        <nav>
            {props.children}
        </nav>
    )
}