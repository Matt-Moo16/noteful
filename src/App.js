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
import config from './config'



class App extends Component {
  state = {
    notes: [],
    folders: [],
    handleDeleteNote: this.handleDeleteNote
  }

  componentDidMount() {
    Promise.all([
      fetch(config.FOLDERS_API_ENDPOINT, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer`+ config.API_KEY
        }
      }),
      fetch(config.NOTES_API_ENDPOINT, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`
        }
      })
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
        console.log(this.state.notes)
      })
      .catch(error => {
        console.error({error})
      })

    }) 
  }
  
  handleDeleteNote = noteId => {
    return fetch(config.NOTES_API_ENDPOINT + `/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      },
    })
    .then(() => {
      this.setState({notes: this.state.notes.filter(note => note.id !== noteId)})
    })
    .catch(error => {
      console.error({error})
    })
  }

  handleAddNote = note => {
    return fetch(config.NOTES_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
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
    .catch(error => {
      console.error({error})
    })
  }

  handleAddFolder = folder => {
    return fetch(config.FOLDERS_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
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
    .catch(error => {
      console.error({error})
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
          <ErrorPage>
            <Route exact path='/folder/new' component={AddFolder} /> 
          </ErrorPage>
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
                console.log(typeof(folderId))
                const notes = this.state.notes.filter(note => note.folderId === parseInt(folderId))
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