import React from 'react';

export default function Navbar() {
    return (
        <header>
            <div className="bg-dark collapse" id="navbarHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-7 py-4">
                            <h4 className="text-white">About</h4>
                            <p className="text-muted">
                                Add some information about the album below, the author, or any
                                other background context. Make it a few sentences long so folks can
                                pick up some informative tidbits. Then, link them off to some social
                                networking sites or contact information.
                            </p>
                        </div>
                        <div className="col-sm-4 offset-md-1 py-4">
                            <h4 className="text-white">Contact</h4>
                            <ul className="list-unstyled">
                                <li><a className="text-white" href="#">Follow on Twitter</a></li>
                                <li><a className="text-white" href="#">Like on Facebook</a></li>
                                <li><a className="text-white" href="#">Email me</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20" height="20"
                            fill="none" stroke="currentColor"
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            className="me-2" viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        <strong>Album</strong>
                    </a>
                    <button
                        className="navbar-toggler collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarHeader"
                        aria-controls="navbarHeader"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                </div>
            </div>
        </header>
    );
}
