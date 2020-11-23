import React from 'react'

export default function Sidebar(props) {
    return (
        <nav>
            {props.children}
        </nav>
    )
}