import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
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
import ErrorPage from './ErrorPage'



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

  handleAddNote = note => {
    return fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    .then(response => {
      if(!response.ok) {
        alert('Something went wrong')
      }
      return response.json()
      
    })
    .then((responseJson) => {
      this.setState({notes: [...this.state.notes, responseJson]})
    })
  }

  handleAddFolder = folder => {
    return fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder)
    })
    .then(response => {
      if(!response.ok) {
        alert('Something went wrong')
      }
      return response.json()

    })
    .then((responseJson) => {
      this.setState({folders: [...this.state.folders, responseJson]})
    })
  }



  render() {
    return (
      <Context.Provider value={{...this.state, 
        handleDeleteNote: this.handleDeleteNote, 
      handleAddFolder: this.handleAddFolder,
      handleAddNote: this.handleAddNote}}>
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
          <ErrorPage>
            <Route exact path='/note-new' render={(routeProps) => {
              const folders = this.state.folders
              return <AddNote folders={folders} routeProps={routeProps}/>
            }}>
            </Route>
          </ErrorPage >
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