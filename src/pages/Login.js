import React, {useContext} from 'react';
import cls from './Login.module.css'
import {Context} from "../index";
import firebase from "firebase";

const Login = () => {
    const {auth} = useContext(Context)

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider)
        //console.log(provider)
    }
    return (
        <div className={cls.container}>
            <div className={cls.loginForm}>
                <button className={cls.loginButton} onClick={login}>Login by Google</button>
            </div>

        </div>
    );
};

export default Login;