import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addCustomers, insertCustomer } from '../../slices/CustomerSlice';
import { fetchCustomer } from '../../slices/CustomerSlice.js'
import { useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const { customers } = useSelector((state) => state.customer)

    useEffect(() => {
        dispatch(fetchCustomer())
    }, [])

    return (
        <div>
            <input type="text" placeholder='enter the title' value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder='enter the email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            {
                customers.map((customer, index) => (
                    <div key={index}>
                        <h4>{customer.email}</h4>
                    </div>
                ))
            }
            <button onClick={() => { dispatch(insertCustomer({ title: title, email: email })) }}>ADD</button>
        </div>
    )
}
