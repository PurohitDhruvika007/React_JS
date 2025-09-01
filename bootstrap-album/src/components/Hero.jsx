import React from 'react'

export default function Hero() {
    return (
        <section className='d-flex justify-content-center p-5 text-center'>
            <div className='w-50 m-5'>
                <p className='fs-1'>Album example</p>
                <p className='text-secondary'>Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                <div>
                    <button className='btn btn-primary me-3'>
                        Main call to action
                    </button>
                    <button className='btn btn-secondary'>
                        secondary action
                    </button>
                </div>
            </div>
        </section>
    )
}
