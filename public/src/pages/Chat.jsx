import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import './Chat.css'
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

export default function Chat() {

    const socket = useRef();
    const [contacts, setConstacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, changeCurrentChat] = useState(undefined);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {

                if (!localStorage.getItem("chat-app-user")) {
                    navigate("/login")
                } else {
                    setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));


                }
            } catch (error) {

            }
        }
        fetchData()
    }, [currentUser]);
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentUser) {
                    
                    if (currentUser.isProfileImg) {
                        
                        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                        setConstacts(data.data);

                    } else {
                        navigate("/setProfile")
                    }
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchData();

    }, [currentUser]);
    // useEffect(() => {
    //     if (currentUser) {
    //         //socket.current = io(host); // Connect to the server
    //         //socket.current.emit("add-user", currentUser._id);
    //     } 
    // },[])

    const handleChatChange = (chat) => {
        changeCurrentChat(chat);

    }

    return (
        <div className="chat_container">

            <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
            <div>
                {
                    currentChat === undefined ?
                        <Welcome user={currentUser} /> :
                        <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} />
                }
            </div>
        </div>
    )
}