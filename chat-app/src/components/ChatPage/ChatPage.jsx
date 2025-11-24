import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, readMessage, deleteMessage, updateMessage } from '../../slices/chatSlice';
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
    const [isEditing, setIsEditing] = useState(false);
    const [editChatId, setEditChatId] = useState(null);

    useEffect(() => {
        dispatch(getuser());
        dispatch(readMessage({ sender: currentUser.email, receiver: receiver.email }));
    }, []);

    // -------------------------------------
    // LONG PRESS HANDLERS
    // -------------------------------------

    let pressTimer;

    const handleLongPressStart = (chat) => {
        pressTimer = setTimeout(() => {
            startEditing(chat);  // ← Start editing on long press
        }, 600);
    };

    const handleLongPressEnd = () => {
        clearTimeout(pressTimer);
    };

    // -------------------------------------
    // DELETE MESSAGE
    // -------------------------------------
    const handleDeleteMessage = (chatId) => {
        dispatch(deleteMessage({
            chatId,
            sender: currentUser.email,
            receiver: receiver.email
        }));
        dispatch(readMessage({
            sender: currentUser.email,
            receiver: receiver.email
        }));
    };

    // -------------------------------------
    // ENTER EDIT MODE
    // -------------------------------------
    const startEditing = (chat) => {
        setIsEditing(true);
        setEditChatId(chat.chatId);
        setMessage(chat.message); // Put text in input
    };

    // -------------------------------------
    // SEND OR UPDATE MESSAGE
    // -------------------------------------
    const handleSend = () => {
        if (isEditing) {
            // UPDATE existing message
            dispatch(updateMessage({
                chatId: editChatId,
                sender: currentUser.email,
                receiver: receiver.email,
                message
            }));
        } else {
            // SEND new message
            dispatch(sendMessage({
                sender: currentUser.email,
                receiver: receiver.email,
                message
            }));
        }

        // Refresh chat
        dispatch(readMessage({
            sender: currentUser.email,
            receiver: receiver.email
        }));

        // Reset input
        setMessage("");
        setIsEditing(false);
        setEditChatId(null);
    };

    // -------------------------------------
    // UI
    // -------------------------------------
    return (
        <div className="chat-wrapper">

            <div className="chat-header">
                <h2>{receiver.email}</h2>
            </div>

            <div className="chat-view">
                {chats.map((chat, index) => {
                    const isSender = chat.sender === currentUser.email;

                    return (
                        <div
                            key={index}
                            className={`chat-bubble ${isSender ? "sender" : "receiver"}`}

                            onDoubleClick={() => isSender && handleDeleteMessage(chat.chatId)}

                            onMouseDown={() => isSender && handleLongPressStart(chat)}
                            onMouseUp={handleLongPressEnd}
                            onMouseLeave={handleLongPressEnd}

                            onTouchStart={() => isSender && handleLongPressStart(chat)}
                            onTouchEnd={handleLongPressEnd}
                        >
                            {chat.message}
                        </div>
                    );
                })}
            </div>

            <div className="chat-input-bar">
                <input
                    type="text"
                    placeholder={isEditing ? "Update message..." : "Write a message..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button onClick={handleSend}>
                    {isEditing ? "Update" : "Send"}
                </button>
            </div>

        </div>
    );
}
