import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase'
import { BrowserRouter } from 'react-router-dom'

var config = {
    apiKey: "AIzaSyDKdVNe4GMp-mkOsvvOcE-vi5K9jjK5pfY",
    authDomain: "urlmini.firebaseapp.com",
    databaseURL: "https://urlmini.firebaseio.com",
    projectId: "urlmini",
    storageBucket: "urlmini.appspot.com",
    messagingSenderId: "370497492174"
  };
  firebase.initializeApp(config);

ReactDOM.render(<BrowserRouter>
                    <App />
                </BrowserRouter>
                , document.getElementById('root'));

serviceWorker.unregister();