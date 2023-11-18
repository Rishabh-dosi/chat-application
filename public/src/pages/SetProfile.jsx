/*import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { profileRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
export default function SetProfile() {

    const navigate = useNavigate();
    const api = "https://api.nultiavatar.com/99144213";
    const [isSelected, setIsselected] = useState();
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const [avatars, setAvatars] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = [];
    //         try {
    //             for (let i = 0; i < 4; i++) {
    //                 const image = await axios.get(
    //                     `${api}/${Math.round(Math.random() * 1000)}`,
    //                      // Specify the response type as arraybuffer
    //                 );
    //                 const buffer = Buffer.from(image.data, "binary"); // Use Buffer.from() to create a buffer
    //                 data.push(buffer.toString("base64"));
    //             }
    //             setAvatars(data);
    //             console.log(data)
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    useEffect(async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}`
            );
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        
    }, []);
    return (
        <>
            <div>
                img is here 
                {avatars.map((avatar, index) => {
                    return (
                        <div
                            key={index} 
                            className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                        }`}>
                            <img src={`data:image/svg+xml;base64,${avatar}`}
                                alt="avatar"
                                onClick={setSelectedAvatar()}
                            />
                        </div>
                    )
                })}
            </div>
        </>
    )
}*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { profileRoute } from "../utils/APIRoutes";
import loader from '../assets/loader.gif';
import './profile.css';
export default function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    

    
    
    
    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            try {
                for (let i = 0; i < 4; i++) {
                    const image = await axios.get(
                        `${api}/${Math.round(Math.random() * 1000)}`
                    );
                    const buffer = new Buffer(image.data);
                    data.push(buffer.toString("base64"));
                }
                setAvatars(data);
                setIsLoading(false);
                
            } catch (error) {
                console.log(error);
            }

        };
        fetchData()
        
        
    }, []);
    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            alert("select to kar pehle la*de");
        }
        else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const { data } = await axios.post(`${profileRoute}/${user._id}`,
                {
                    image: avatars[selectedAvatar],

                });
            if (data.isSet) {
                user.isProfileImg= true;
                user.profileImg = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate('/');
            } else {
                alert("error");
            }
        }

    }
    return (
        <>
            <div className="container">
                {isLoading ? (
                    <div className="loader">
                        <img src={loader} alt="loader" className="loader" />
                    </div>
                ) : (
                    <div>
                        <div className="title-div">
                            <h1>Pick an Avatar as your profile picture</h1>
                        </div>
                        <div className="avatars">
                            {avatars.map((avatar, index) => {
                                return (
                                    <div
                                        className={`avatar ${selectedAvatar === index ? "selected" : ""
                                            }`}
                                    >
                                        <img
                                            src={`data:image/svg+xml;base64,${avatar}`}
                                            alt="avatar"
                                            key={avatar}
                                            onClick={() => setSelectedAvatar(index)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <button onClick={setProfilePicture} className="submit-btn">
                            Set as Profile Picture
                        </button>

                    </div>
                )}
            </div>
        </>
    );
}