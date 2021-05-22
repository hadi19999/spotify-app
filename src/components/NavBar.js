import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { Link } from 'react-router-dom';

class NavBar extends Component {

	logout() {
			AuthService.logout();
			window.location.href="/";
	}

    render(){
    		return (
				<nav className="navbar">
					<div className="navbar-title">
						<p>Spotify Artist Search</p>
					</div>
					<div className="navbar-button">
						{ AuthService.isLoggedIn()?
					<button className="logout-button" AuthService={true}  onClick={() => this.logout()}><Link className="no-decoration" to="/">Logout</Link></button>: ''
						}
					</div>
				</nav>
				
			);
    	}
	
}

export default NavBar