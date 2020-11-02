import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'


export default function Main(props) {
    return (
        <main className='App'>
            {props.children}
        </main>
    )
}