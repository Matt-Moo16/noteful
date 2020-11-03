import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import moment from 'moment'
import {format} from 'date-fns'
import Context from './Context'

class NoteInfo extends Component {
    static contextType= Context
    render() {
        if (this.props.note[0]){
            return (
                <>
                 <div className='note' id={this.props.note[0].id}>
                        <h2>
                            <Link to={`/note/${this.props.note[0].id}`}>{this.props.note[0].name}</Link>
                        </h2>
                        <button className='note-delete' type='button' onClick={e => this.context.handleDeleteNote(this.props.note[0].id)}>
                            Remove Note
                        </button>
                        <div className='note-dates'>
                            Modified 
                            {' '}
                            <span>
                                {moment(this.props.note[0].modified).format('Do MMM YYYY')}
                            </span>
                        </div>
                        <pre>
                            {this.props.note[0].content}
                        </pre>
        
                    </div>
                </>
            )
        } else {
            return <Redirect to="/" />
        }
    }
    
}

export default NoteInfo