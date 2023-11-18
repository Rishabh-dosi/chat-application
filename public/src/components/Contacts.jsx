import React, { useEffect, useState } from "react";
import Logo from '../assets/logo.svg';
import '../pages/Chat.css';
import Logout from "./Logout";
import axios from "axios";

export default function Contacts({ contacts, currentUser, changeChat}) {
    const [currentUsername, setCurrentUsername] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState("");
    const [currentSelected, setCurrentSelected] = useState(undefined);
    useEffect(() =>{

        if (currentUser) {
            setCurrentUsername(currentUser.username);
            setCurrentUserImage(currentUser.profileImg);
            

        }

    }, [currentUser]);
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        
        changeChat(contact);
     }
    return (
        <div className="contacts_container">
            {
                
                currentUserImage && currentUsername && (
                    <div className="contact-section">
                        <div className="brand">
                            <img src={Logo} alt="" />
                            <h3>NEURON</h3>
                        </div>

                        <div className="contacts">
                            
                            {
                                contacts.map((contact, index) => 




                                    (
                                        <div
                                            key={index}
                                            className={`contact
                                         ${index === currentSelected ? "selected" : ""}`}
                                        onClick={()=>changeCurrentChat(index , contact)}
                                        >

                                            <div className="avatar">
                                                <img src={`data:image/svg+xml;base64,${contact.profileImg}`} alt="avatar" />

                                            </div>
                                            <div className="username">
                                                <h2>
                                                    {contact.username}
                                                </h2>
                                            </div>
                                            



                                        </div>
                                    )
                                )
                            }

                        </div>
                        <div className="currentuser">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="me hu na" />

                            </div>
                            <div className="username">
                                <h2>
                                    {currentUsername}
                                </h2>
                                
                            </div>
                            <div className="logout">
                                <Logout />
                                
                            </div>

                        </div>

                    </div>

                )
            }
        </div>
    )



}