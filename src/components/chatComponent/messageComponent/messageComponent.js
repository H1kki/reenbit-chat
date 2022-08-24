import React, {useContext} from 'react';
import cls from "../chatComponent.module.css";
import {Context} from "../../../index";
import {useAuthState} from "react-firebase-hooks/auth";

const MessageComponent = ({message}) => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    //console.log(message.name === user.displayName)
    return (
        <div className={cls.messageContainer}>
            <img src='https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png' width='40' height='40'/>
            <div className={message.name === user.displayName ? `${cls.message} ${cls.anotherMessage}` : cls.message}>
                <p>{message}</p>
                <p>4/22/17 4:09 PM</p>
            </div>
        </div>
    );
};

export default MessageComponent;