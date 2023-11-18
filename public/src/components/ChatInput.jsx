import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';
import '../pages/Chat.css'
export default function ChatInput({handleSendMsg}) {
    const [emojibox, showEmoji] = useState(false);
    const [msg, setMsg] = useState("");
    
    const handleEmoji = () => {
        showEmoji(!emojibox);
    }
    const handleEmojiChange = (event) => {
        
        let message = msg;
        message += event.emoji;
        setMsg(message);
    }
    const sendMsg = (e) => {
        e.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg)
            setMsg("")
        }
    }
    return (
        <div className="inp-container">
            <div className="emoji" onClick={handleEmoji}>
                <EmojiEmotionsIcon style={{ color: "yellow" }} />
                

            </div>
            {
                emojibox &&
                <div className="emojibox">
                    <EmojiPicker height={"300px"} width={"300px"} onEmojiClick={handleEmojiChange} />
                </div>
            }
            <form className="chatbox-inp" onSubmit={(event) => sendMsg(event)}>
                <input type="text"
                    placeholder="Enter your message here"
                    className="inp"
                    value={msg}
                    onChange={(e) =>setMsg(e.target.value)}
                />
                <div className="btn">
                    <button >
                        <SendIcon style={{ color: "blue" }} />
                    </button>
                </div>
            </form>
            

        </div>
    )
}