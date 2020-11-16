import React, { Component } from 'react'
import './AddNote.css'
import {Link} from 'react-router-dom'
import Context from './Context'
import PropTypes from 'prop-types'
export default class AddNote extends Component{
    constructor(props) {
        const {folders = []} = props
        super(props);
        this.state = {
            title: '',
            content: '', 
            folderId: (folders[0] || {} ).id, 
            titleValid: false,
            contentValid: false, 
        }
    }

    static contextType = Context

    updateTitle(name) {
        this.setState({title: name, titleValid: true})
    }

    updateContent(con) {
        this.setState({content: con, contentValid: true})
    }

    updateFolderId(id) {
        console.log(id)
        this.setState({folderId: id})
        console.log(this.state)
    }
   
    validateTitle() {
        const title = this.state.title.trim()
        if(title.length === 0) {
            return 'Name is Required'
        }
    }

    validateContent() {
        const content = this.state.content.trim()
        if(content.length === 0) {
            return 'Content is Required'
        }
    }


    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <legend>Create a Note:</legend>
                        <label htmlFor='note-title'>Name</label>
                        <input type='text' name='note-title'
                        onChange={e => this.updateTitle(e.target.value)}></input>
                        <br />
                        <label htmlFor='content'>Content</label>
                        <input type='text' name='content'
                        onChange={e => this.updateContent(e.target.value)}></input>
                        <br /> 
                        <label htmlFor='folder'>Folder</label>
                        <select id='folder' name='folder-name' onChange={e => this.updateFolderId(e.target.value)}>
                            {this.context.folders.map((folder, i) => 
                                <option key={i} value={folder.id}>{folder.name}</option>
                            )}
                        </select>
                        <br /> 
                        <input type='submit' value='Add Note'
                        disabled={this.validateTitle() || 
                        this.validateContent()} 
                        onClick={e => this.context.handleAddNote({'name': this.state.title, 'content': this.state.content, 'folderId': this.state.folderId})}/> 
                    </fieldset>
                </form>
                <button onClick={() => this.props.routeProps.history.goBack()}>Back</button>
    
            </>                
        )
    }

}

AddNote.defaultProps = {
   folders: []
};

AddNote.propType = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    routeProps: PropTypes.object
}