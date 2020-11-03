import React, {Component} from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import dummyStore from './dummy-store'
import FolderList from './FolderList'
import Sidebar from './Sidebar'
import Main from './Main'
import NoteList from './NoteList'
import Folder from './Folder'
import './App.css'
import AddFolder from './AddFolder'
import NoteInfo from './NoteInfo';
import AddNote from './AddNote'
import Context from './Context'



class App extends Component {
  state = {
    notes: [],
    folders: [],
    handleDeleteNote: this.handleDeleteNote
  }

  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/folders`),
      fetch(`http://localhost:9090/notes`)
    ])
    .then(([foldersResponse, notesResponse]) => {
      if (!foldersResponse.ok) {
        alert('Something went wrong')
      }
      if (!notesResponse.ok) {
        alert('Something went wrong')
      }
      
      return Promise.all([foldersResponse.json(), notesResponse.json()])
      
      .then(([folders, notes]) => {
        this.setState({folders, notes})
      })
      .catch(error => {
        console.error({error})
      })

    }) 
  }
  
  handleDeleteNote = noteId => {
    return fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(() => {
      this.setState({notes: this.state.notes.filter(note => note.id != noteId)})
    })
  }



  render() {
    return (
      <Context.Provider value={{...this.state, handleDeleteNote: this.handleDeleteNote}}>
        <>
        <header>
          <h1>
            <Link to='/'>
              Noteful
            </Link>
          </h1>
          <Route path='/'></Route>
        </header>
        <Sidebar>
          <FolderList folders={this.state.folders} />
          <Route exact path='/folder/new' component={AddFolder} /> 
        </Sidebar>
        <Main className='App'>
          <Route exact path='/'>
            <NoteList notes={this.state.notes}/>
          </Route>
          <Route exact path='/note-new' render={(routeProps) => {
            const folders = this.state.folders
            return <AddNote folders={folders} routeProps={routeProps}/>
          }}>
          </Route>
          <Route exact path='/folder/:folderId' render={
            (routeProps) => {
              const folderId = routeProps.match.params.folderId
              const notes = this.state.notes.filter(note => note.folderId === folderId)
            return <Folder notes={notes} />
          } 
          }/>
          <Route exact path='/note/:id' render={(routeProps) => {
            const noteId = routeProps.match.params.id
            const note = this.state.notes.filter(note => note.id === noteId)
            return <NoteInfo note={note}/>
            }
          }/>
        </Main>
        </>
        </Context.Provider>
    );
  }
}

export default App;