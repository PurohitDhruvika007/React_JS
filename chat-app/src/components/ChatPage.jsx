import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, readMessage } from '../slices/chatSlice';
import { getuser } from '../slices/userSlice';

export default function ChatPage() {
    const location = useLocation();
    const receiver = location.state;
    const dispatch = useDispatch();
    let { currentUser } = useSelector(state => state.user)
    const { chats } = useSelector(state => state.chat)
    currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const [message, setMessage] = useState("");
    useEffect(() => {
        dispatch(getuser())
        dispatch(readMessage({ sender: currentUser.email, receiver: receiver.email }))
    }, [])


    return (
        <div>

            <div className="chat-main">
                <div className="chat-veiw">
                    <h1>{receiver.email}</h1>
                    <div>
                        {
                            chats.map((chat, index) => <p key={index}>{chat.message}</p>)
                        }
                    </div>
                </div>
                <div className="chat-input">
                    <input type="text" placeholder='write the chat..' value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={() => {
                        dispatch(sendMessage({ sender: currentUser.email, receiver: receiver.email, message: message }))
                        dispatch(readMessage({ sender: currentUser.email, receiver: receiver.email }))
                        setMessage("");
                    }}>send</button>
                </div>
            </div>
        </div>
    )
}
