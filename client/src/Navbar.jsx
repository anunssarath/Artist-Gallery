import React from 'react'
import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark " style={{backgroundColor:"#b19b9b"}}>
            <div className="container-fluid">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">&nbsp;&nbsp;
                        <li className="nav-item"  style={{fontWeight:"bold",marginLeft:"60px"}} >
                            <Link to="/home" className="nav-link">Home</Link>
                        </li>&nbsp;&nbsp;&nbsp;&nbsp;
                        <li className="nav-item" style={{fontWeight:"bold"}}>
                            <Link to="/gallery" className="nav-link">Gallery</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar