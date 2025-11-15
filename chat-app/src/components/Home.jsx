import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, getuser } from '../slices/userSlice';
import { useNavigate } from 'react-router';

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUser());
        dispatch(getuser());
    }, []);
    const navigate = useNavigate();
    const { users, isLoading, currentUser } = useSelector(state => state.user);
    return (
        <div>
            <h1>Admin:{currentUser.email}</h1>
            <h1>Home page</h1>
            {
                isLoading ? <h1>users data is loading...</h1> :
                    <div>
                        {
                            users.map((user, id) => {
                                if (currentUser.email !== user.email) {
                                    return <div key={id} onClick={() => navigate('/chat', { state: user })}>
                                        <h2>{user.email}</h2>
                                    </div>
                                }

                            })
                        }
                    </div>
            }
        </div>
    )
}
