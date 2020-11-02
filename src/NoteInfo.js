import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {format} from 'date-fns'

function NoteInfo(props) {
    return (
        <>
         <div className='note' id={props.note[0].id}>
                <h2>
                    <Link to={`/note/${props.note[0].id}`}>{props.note[0].name}</Link>
                </h2>
                <button className='note-delete' type='button'>
                    Remove Note
                </button>
                <div className='note-dates'>
                    Modified 
                    {' '}
                    <span>
                        {moment(props.note[0].modified).format('Do MMM YYYY')}
                    </span>
                </div>
                <pre>
                    {props.note[0].content}
                </pre>

            </div>
        </>
        )
}

export default NoteInfo