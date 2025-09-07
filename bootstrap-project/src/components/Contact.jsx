import React from 'react'

export default function Contact() {
    return (
        <div className=' bg-dark' id="contact">
            <div className="container text-white text-center">
                <div className="row pt-5 pb-5" style={{ minHeight: 250 }}>
                    <div className="col-12 col-md-3 justify-content-center justify-content-md-start">
                        <div>
                            <div>
                                <p href="#" className='text-white text-decoration-none'><strong>Email : </strong>support@eccomerce.com</p>
                            </div>
                            <div>
                                <p href="#" className='text-white text-decoration-none'><strong>Phone : </strong> +91 98765 43210</p>
                            </div>
                            <div>
                                <p href="#" className='text-white text-decoration-none'><strong>Address : </strong>Eccomerce HQ, 2nd Floor, Shopping Plaza, MG Road, surat, India – 380001</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div style={{ maxHeight: 170 }}>
                            <p className="mb-0">
                                © {new Date().getFullYear()} <strong>Eccomerce</strong>. All rights reserved.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className='d-flex align-items-md-center justify-content-center justify-content-md-end gap-3 mt-3 mt-md-0'>
                            <div>
                                <a href="#" className='text-white text-decoration-none fs-2'><i className="ri-whatsapp-line"></i></a>
                            </div>
                            <div>
                                <a href="#" className='text-white text-decoration-none fs-2'><i className="ri-facebook-line"></i></a>
                            </div>
                            <div>
                                <a href="#" className='text-white text-decoration-none fs-2'><i className="ri-instagram-line"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
