import React from 'react';
import cls from "../sideBarComponent.module.css";
import {Link} from "react-router-dom";

const ChatRoomComponent = ({room, message}) => {
    const date = new Date(message.createdAt)
    return (
        <Link to={`/chat/${room}`}>
            <div className={cls.chatRoom}>
                <div className={cls.userAvatar}>
                    <img src='https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png' width='40' height='40'/>
                    <i className={`fa-regular fa-circle-check`} style={{color: "green", position: "absolute", top: 25, left: 30}}></i>
                </div>
                <div className={cls.chatInfo}>
                    <div>
                        <p>{room}</p>
                        <p>{message.text}</p>
                    </div>
                    <p className={cls.date}>{date.toLocaleString('en-US', {month: 'short'})} {date.getDate()}, {date.getFullYear()}</p>
                </div>
            </div>
        </Link>
    );
};

export default ChatRoomComponent;