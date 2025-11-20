import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, readMessage } from '../../slices/chatSlice';
import { getuser } from '../../slices/userSlice';
import './ChatPage.css';

export default function ChatPage() {
    const location = useLocation();
    const receiver = location.state;
    const dispatch = useDispatch();

    let { currentUser } = useSelector(state => state.user);
    const { chats } = useSelector(state => state.chat);

    currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(getuser());
        dispatch(readMessage({ sender: currentUser.email, receiver: receiver.email }));
    }, []);

    return (
        <div className="chat-wrapper">

            {/* HEADER */}
            <div className="chat-header">
                <h2>{receiver.email}</h2>
            </div>

            {/* CHAT VIEW */}
            <div className="chat-view">
                {chats.map((chat, index) => {
                    const isSender = chat.sender === currentUser.email;

                    return (
                        <div
                            key={index}
                            className={`chat-bubble ${isSender ? "sender" : "receiver"}`}
                        >
                            {chat.message}
                        </div>
                    );
                })}
            </div>

            {/* INPUT BAR */}
            <div className="chat-input-bar">
                <input
                    type="text"
                    placeholder="Write a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    onClick={() => {
                        dispatch(sendMessage({
                            sender: currentUser.email,
                            receiver: receiver.email,
                            message: message
                        }));
                        dispatch(readMessage({
                            sender: currentUser.email,
                            receiver: receiver.email
                        }));
                        setMessage("");
                    }}
                >
                    Send
                </button>
            </div>

        </div>
    );
}
