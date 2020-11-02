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
// finish creating the routes
// add some styling 
// figure out the history thing
// rewatch that video on react router



class App extends Component {
  state = dummyStore


  render() {
    return (
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
      
    );
  }
}

export default App;