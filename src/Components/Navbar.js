import React from 'react';
// import '../App.css';
import { Link } from 'react-router-dom'

function Navbar() {

  // let username = window.localStorage.getItem('user')
  

  const logout = () => {
    window.localStorage.clear();
  }

  return (
    <div className="navbar">
      <div className='logo'>
        <Link to='/'>
          <h3>ExpertsToLearnFrom</h3>
        </Link>
      </div>

      <div className='nav-links'>
        <Link to='/' >Dashboard</Link>
        <Link to='/Login' >Login</Link>
        <Link to='/sign-up' >Sign Up</Link>
        <Link to='/new-expert' >New Entry</Link>
        <Link to='/about' >About</Link>
        <a onClick={logout} href='/'>Logout </a>
        {/* <p>Hello, {username}</p> */}
      </div>
      
    </div>
  );
}

export default Navbar;
