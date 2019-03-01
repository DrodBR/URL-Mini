import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase'
import { BrowserRouter } from 'react-router-dom'

var config = {
    apiKey: "AIzaSyC8RHjl0IGoyuHeunEu0fkm7Tyeps1mkEY",
    authDomain: "urlshortner-dr.firebaseapp.com",
    databaseURL: "https://urlshortner-dr.firebaseio.com",
    projectId: "urlshortner-dr",
    storageBucket: "",
    messagingSenderId: "974364789030"
  };
  firebase.initializeApp(config);


ReactDOM.render(<BrowserRouter>
                    <App />
                </BrowserRouter>
                , document.getElementById('root'));

serviceWorker.unregister();