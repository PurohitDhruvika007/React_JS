import React from 'react'

export default function Hero() {
    return (
        <div id="hero">
            <div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-bs-ride="carousel"
            >
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={0}
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    />
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={1}
                        aria-label="Slide 2"
                    />
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={2}
                        aria-label="Slide 3"
                    />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://i.pinimg.com/736x/e4/dc/d8/e4dcd8a80475b99cef4d66dc8df94909.jpg" className="d-block w-100" style={{ height: 550 }} alt="..." />
                        <div className="carousel-caption d-none d-md-block">

                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://i.pinimg.com/1200x/56/83/ad/5683adca43e6cb9f5f68affa55cc6d88.jpg" className="d-block w-100" style={{ height: 550 }} alt="..." />
                        <div className="carousel-caption d-none d-md-block">

                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://i.pinimg.com/736x/ec/6a/85/ec6a85f49f587f53071d9c03beb31c1a.jpg" className="d-block w-100" style={{ height: 550 }} alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                        </div>
                    </div>

                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
    )
}
