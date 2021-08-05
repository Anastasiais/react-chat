import React, { createContext }from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
firebase.initializeApp(
  {
    apiKey: "AIzaSyC9oC0us97iOqtg69FD3gwiyQ-QE06QIuQ",
    authDomain: "chat-react-realtime.firebaseapp.com",
    projectId: "chat-react-realtime",
    storageBucket: "chat-react-realtime.appspot.com",
    messagingSenderId: "527924425400",
    appId: "1:527924425400:web:55e60717f4a61a964a7a4d",
    measurementId: "G-DVY1X21P07"
  }
);

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();



ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{
      firebase,
      auth,
      firestore
    }}>
    <App />
  </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

