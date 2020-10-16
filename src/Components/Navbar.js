import React from 'react';
import '../App.css';

function Navbar() {
  return (
    <div className="navbar">
      <div className='logo'>
        <h3>ExpertsToLearnFrom</h3>
      </div>

      <div className='nav-links'>
        <a href='/' >Dashboard</a>
        <a href='/Login' >Login</a>
        <a href='/new-expert' >Post New Expert</a>
      </div>
      
    </div>
  );
}

export default Navbar;
