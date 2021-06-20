import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {

  let username = window.localStorage.getItem('user')
  

  const logout = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  const renderLoginButton = () => {
    if (username != null) {
      return <p>Welcome, {username}</p>
    } else {
      return <Link to='/Login' >Login</Link> 
    }
  }

  const renderSignInButton = () => {
    if (username == null) {
      return <Link to='/sign-up' >Sign Up</Link>
    } else {
      return
    }
  }

  const renderLogoutButton = () => {
    if (username != null) {
      return <a onClick={logout} href='/'>Logout </a>
    } else {
      return
    }
  }

  return (
    <div className="navbar">
      <div className='logo'>
        <Link to='/'>
          <h3>ExpertsToLearnFrom</h3>
        </Link>
      </div>

      <div className='nav-links'>
        {renderLoginButton()}
        <Link to='/' >Dashboard</Link>
        <Link to='/new-expert' >New Entry</Link>
        <Link to='/about' >About</Link>
        {renderSignInButton()}
        {renderLogoutButton()}
      </div>
      
    </div>
  );
}

export default Navbar;
