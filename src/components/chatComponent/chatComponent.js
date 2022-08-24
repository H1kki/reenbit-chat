import React, {useContext, useState} from 'react';
import cls from './chatComponent.module.css'
import {Context} from "../../index";
import {useParams} from "react-router-dom";
import axios from 'axios'
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {ToastContainer, toast} from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

const ChatComponent = () => {
    const {firestore, auth} = useContext(Context)
    const [user] = useAuthState(auth)
    //console.log(user.displayName)
    const params = useParams()
    const [rooms, loading] = useCollectionData(firestore.collection("chatRooms").where('room', '==', params.name))
    const [value, setValue] = useState('')
    //console.log('ROOMS', rooms)
    const collectionRef = firestore.collection('chatRooms'),
        docRef = collectionRef.doc(params.name === 'Josefina' ? 'RHiDwVNVoXOliICgzn1F' : 'WmuEsfQTbnYh2zUSmM3p')
    //onsole.log("COOOL", rooms)
    if (typeof window !== "undefined") {
        injectStyle();
    }

    console.log(rooms)
    const sendMessage = async (e) => {
        e.preventDefault()
        const myMessage = {name: user.displayName, text: value, createdAt: Date.now()}
        await docRef.update({
            messages: [...rooms[0].messages, {...myMessage}],
            lastMessage: Date.now()
        })
        console.log('collection before CHuck', rooms[0].messages)
        setTimeout(async () => {
            const response = await axios.get('https://api.chucknorris.io/jokes/random')
            //console.log('joke', response)
            await docRef.update({
                messages: [...rooms[0].messages, {...myMessage}, {name: params.name, text: response.data.value, createdAt: Date.now()}],
                lastMessage: Date.now()
            })
            toast(`${params.name}: ${response.data.value}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }, 3000)
        setValue('')
    }
    if(loading) return <h1>Loading</h1>
    return (
        <div className={cls.chatContainer}>
            <div className={cls.userAvatar}>
                <img src='https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png' width='40' height='40'/>
                <i className={`fa-regular fa-circle-check`} style={{color: "green", position: "absolute", top: 25, left: 30}}></i>
                <h3 style={{marginLeft: 10}}>{rooms[0].room}</h3>
            </div>
            <div className={cls.chat}>
                {rooms[0].messages.map(el =>{
                    //console.log(new Date(el.createdAt).toLocaleDateString('en-US'))
                    return <div className={el.name === user.displayName ? `${cls.messageContainer} ${cls.anotherMessage}` : cls.messageContainer}>
                        {user.displayName === el.name ? null : <img style={{marginRight: 10}} src='https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png' width='40' height='40'/>}
                        <div>
                            <p className={user.displayName === el.name ? cls.myMessage : cls.message} >{el.text}</p>
                            <p className={cls.date}>{new Date(el.createdAt).toLocaleString('en-US')}</p>
                        </div>
                    </div>
                })}
            </div>
            <ToastContainer/>
            <form>
                <input type="text" placeholder="Type your message" className={cls.messageInput} value={value} onChange={e => setValue(e.target.value)}/>
                <button className={cls.messageButton} onClick={sendMessage}>Send</button>
            </form>
        </div>
    );
};

export default ChatComponent;