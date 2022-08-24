import React, {useContext, useEffect, useState} from 'react';
import cls from './sideBarComponent.module.css'
import {Context} from "../../index";
import ChatRoomComponent from "./chatRoom/chatRoomComponent";
import {useCollectionData} from "react-firebase-hooks/firestore";

const SideBarComponents = () => {
    const {firestore} = useContext(Context)
    const [value, setValue] = useState('')
    const [rooms, loading] = useCollectionData(firestore.collection('chatRooms'))
    const [roomsState, setRoomsState] = useState(null)
    const renderRooms = (rooms) => {
        if(rooms) {
            return rooms.sort((a,b) => b.lastMessage - a.lastMessage)
                .map(el => <ChatRoomComponent room={el.room} message={el.messages[el.messages.length-1]} key={el.name}/>)
        }
    }

    const search = (e) => {
        if(roomsState) {
            setValue(e.target.value)
            console.log(value)
            const filteredRooms = rooms.filter(el => el.room.includes(value.trim()))
            setRoomsState(filteredRooms)
            //console.log('FILTERED', filteredRooms)
        }
    }

    useEffect(() => {
        if(rooms) {
           setRoomsState(rooms)
        }
    }, [rooms])

    if(loading) return <h1>Loading</h1>
    return (
        <div className={cls.sideBar}>
            <div className={cls.userAvatar}>
                <img src='https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png' width='40' height='40'/>
                <i className={`fa-regular fa-circle-check`} style={{color: "green", position: "absolute", top: 25, left: 30}}></i>
            </div>
            <div className={cls.searchContainer}>
                <input className={cls.searchInput} type='text' placeholder={"Search or start new chat"} onChange={search} value={value}/>
                <i className="fa-solid fa-magnifying-glass" style={{position: "absolute", top: 7, left: 8, color: "grey"}}></i>
            </div>
            <div className={cls.chatsContainer}>
                <h3>Chats</h3>
                {renderRooms(roomsState)}
            </div>
        </div>
    );
};

export default SideBarComponents;