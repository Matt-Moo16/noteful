import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import AddNote from './AddNote'
import dummyStore from './dummy-store'
import {BrowserRouter} from 'react-router-dom'




ReactDOM.render(
<BrowserRouter><App/></BrowserRouter>
, document.getElementById('root'));