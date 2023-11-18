import React, { useEffect, useRef, useState } from "react";
import '../pages/Chat.css'
import ChatInput from "./ChatInput";
import axios from "axios";
import { getAllMessages, sendMsgRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";
export default function ChatContainer({ currentUser, currentChat , socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef()
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentChat) {
                    const response = await axios.post(getAllMessages, {
                        from: currentUser._id,
                        to: currentChat._id,
                    });

                    setMessages(response.data);
                    
                }
                
               
                

            } catch (er) {
                console.log(er)
            }
        } 
        fetchData();
    } , [currentChat])
    
    
    
    const handleSendmsg = async (msg) => {
        try {
            await axios.post(sendMsgRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            });
            socket.current.emit("send-msg", {
                to: currentChat._id,
                from: currentUser._id,
                message: msg,

            });
            const msgs = [...messages];
            msgs.push({ fromSelf: true, message: msg });
            setMessages(msgs);
        } catch (error) {
            console.log(error)
            
        }
        

        
    };
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            })
        }
    }, []);
    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev , arrivalMessage])
        
    }, [arrivalMessage])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages]);
    
    return (
        <div className="chat-box">

            <div className="chatbox-head">
                <div className="chat-avatar">
                    <img src={`data:image/svg+xml;base64,${currentChat.profileImg}`} alt="avatar" />
                </div>
                <div className="chat-username">
                    {currentChat.username}
                </div>


            </div>
            <div className="chat-msg">

                {
                    messages.map((message) => {
                        return (
                            <div className={`message ${message.fromSelf ? "sended" : "received"}`} key={message._id}>
                                <div className="content">
                                    <p>
                                        {message.message}
                                    </p>
                                </div>

                            </div>
                        )
                    })
                }


            </div>
            <ChatInput handleSendMsg={handleSendmsg}/>
        </div>
    )
}