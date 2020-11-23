import React, { Component } from 'react'
import Context from './Context';

export default class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            }
            
        }
    }

    static contextType = Context

    updateName(name) {
        this.setState({name: {value: name, touched: true}})
    }

    validateName() {
        const name = this.state.name.value.trim()
        if(name.length === 0) {
            return "Name is required"
        }
    }

        render() {
            return (
                <>
                    <form>
                        <fieldset>
                            <legend>Create a Folder:</legend>
                            <label htmlFor='folder-name'>Folder Name </label>
                            <input type='text' name='name'
                            id='folder-name'
                            onChange={e => this.updateName(e.target.value)}></input>
                            <br />
                            <input type='submit' value='Add Folder'
                            disabled={this.validateName()}
                            onClick={e => this.context.handleAddFolder({"name": this.state.name.value})}></input>
                        </fieldset>
                    </form>
                    <br />
                    <button onClick={() => this.props.history.goBack()}>Back</button>
                </>
            )
        }
}