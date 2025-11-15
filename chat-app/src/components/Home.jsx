import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../slices/userSlice';

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUser());
    }, []);
    const { users, isLoading } = useSelector(state => state.user);
    return (
        <div>
            <h1>Home page</h1>
            {
                isLoading ? <h1>users data is loading...</h1> :
                    <div>
                        {
                            users.map((user, id) => <div key={id}>
                                <h2>{user.email}</h2>
                            </div>)
                        }
                    </div>
            }
        </div>
    )
}
