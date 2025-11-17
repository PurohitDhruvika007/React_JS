import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../slices/chatSlice';
import { getuser } from '../slices/userSlice';

export default function ChatPage() {
    const location = useLocation();
    const receiver = location.state;
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(getuser())
    }, [])


    return (
        <div>

            <div className="chat-main">
                <div className="chat-veiw">
                    <h1>{receiver.email}</h1>
                </div>
                <div className="chat-input">
                    <input type="text" placeholder='write the chat..' />
                    <button onClick={() => {
                        dispatch(sendMessage({ sender: currentUser.email, receiver: receiver.email }))
                    }}>send</button>
                </div>
            </div>
        </div>
    )
}
