import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import firebase from "firebase";
import App from './App';
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyBHfkRwgpFFk42XDQf61Pwniifmc3iyrvU",
    authDomain: "reenbit-chat-ee12d.firebaseapp.com",
    projectId: "reenbit-chat-ee12d",
    storageBucket: "reenbit-chat-ee12d.appspot.com",
    messagingSenderId: "883633784623",
    appId: "1:883633784623:web:826df88a7163eddf8443da",
    measurementId: "G-L347H6FQEC"
});

const firestore = firebase.firestore();
const auth = firebase.auth();

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{firebase, auth, firestore}}>
        <App />
    </Context.Provider>
);
