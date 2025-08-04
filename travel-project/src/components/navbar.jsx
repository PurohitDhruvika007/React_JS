import './navbar.css';
const Navbar=()=><>
    <div className="section-1" id="home">
        <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <h1 className="name">VoyageVista</h1>
    </a>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"><i className="ri-menu-line text-white fs-3"></i></span>
    </button>

    <div className="collapse navbar-collapse  justify-content-end " id="navbarNavAltMarkup">
      <div className="navbar-nav text-center text-md-end">
        <a className="nav-link active  me-0" aria-current="page" href="#home">Home</a>
        <a className="nav-link" href="#travel">Features</a>
        <a className="nav-link" href="#places">Pricing</a>
        <a className="nav-link" href="#about">About</a>
        <a className="nav-link" href="#contact">Contact</a> <hr className='d-block d-md-none'/>
      </div>
    </div>
  </div>
</nav>
        <div className='main'>
    <h2>TRAVEL</h2>
        <p>Your journey begins with VoyageVista</p>
        </div>
    </div>
    
</>
export default Navbar;