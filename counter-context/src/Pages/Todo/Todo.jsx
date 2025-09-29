import React from 'react'

export default function Todo() {
    return (

        <div>
            <h1>todo</h1>
            <input type="text" placeholder='enter todo' onChange={(e) => e.target.value} />
        </div>
    )
}
