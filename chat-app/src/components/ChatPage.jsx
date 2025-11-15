import React from 'react'
import { useLocation } from 'react-router'

export default function ChatPage() {
    const location = useLocation();
    const user = location.state;
    return (
        <div>

            <div className="chat-main">
                <div className="chat-veiw">
                    <h1>{user.email}</h1>
                </div>
                <div className="chat-input">
                    <input type="text" placeholder='write the chat..' />
                    <button>send</button>
                </div>
            </div>
        </div>
    )
}
