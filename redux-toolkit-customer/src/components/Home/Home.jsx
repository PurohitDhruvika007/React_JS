import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addCustomers } from '../../slices/CustomerSlice';
import { fetchCustomer } from '../../slices/CustomerSlice.js'

export default function Home() {
    const dispatch = useDispatch();
    const { customers } = useSelector((state) => state.customer)

    useEffect(() => {
        dispatch(fetchCustomer())
    }, [])

    return (
        <div>
            {
                customers.map((customer, index) => (
                    <div key={index}>
                        <h4>{customer.email}</h4>
                    </div>
                ))
            }
            <button onClick={() => { dispatch(addCustomers("add events")) }}>ADD</button>
        </div>
    )
}
