import React from 'react';
import SideBarComponents from "../components/sideBarComponent/sideBarComponents";
import ChatComponent from "../components/chatComponent/chatComponent";
import {useParams} from "react-router-dom";

const Chat = () => {
    const params = useParams()
    return (
        <>
            <SideBarComponents/>
            {params.name ? <ChatComponent/> : <h2>Start messaging</h2>}
        </>
    );
};

export default Chat;