import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {format} from 'date-fns'

function Note(props) {
    return (
        <>  
         <div className='note' id={props.id}>
                <h2>
                    <Link to={`/note/${props.id}`}>{props.name}</Link>
                </h2>
                <button className='note-delete' type='button'>
                    Remove Note
                </button>
                <div className='note-dates'>
                    Modified 
                    {' '}
                    <span>
                        {moment(props.modified).format('Do MMM YYYY')}
                    </span>
                </div>

            </div>
        </>
        )
}

export default Note