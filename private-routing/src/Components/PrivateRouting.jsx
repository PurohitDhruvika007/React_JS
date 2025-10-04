import React from 'react'
import SignIn from '../Pages/SignIn'

export default function PrivateRouting({ children }) {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    return (
        (user.email && user.password) ? children : <SignIn />
    )
}
