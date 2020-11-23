import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import Context from './Context'
import PropTypes from 'prop-types'

class Note extends Component {
    static contextType = Context
    render() {
        return (
            <>  
             <div className='note' id={this.props.id}>
                    <h2>
                        <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
                    </h2>
                    <button className='note-delete' type='button'
                    onClick={e => this.context.handleDeleteNote(this.props.id)}>
                        Remove Note
                    </button>
                    <div className='note-dates'>
                        Modified 
                        &nbsp;
                        <span>
                            {moment(this.props.modified).format('Do MMM YYYY')}
                        </span>
                    </div>
    
                </div>
            </>
            )
    }
}

export default Note

Note.propType = {
    id: PropTypes.string.isRequired,
    modified: PropTypes.string
}