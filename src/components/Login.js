import logo from './logo.svg';
import React, { Component } from 'react';
import AuthService from '../services/AuthService';

class Login extends Component {

    login = () => {
        return AuthService.AUTHORIZATION_URL;
    };

    render() {
        return (
            <a className="login-box" href={this.login()}>
                <p className="login-text">Login</p>
                <img src={logo} className="spotify-icon" alt="logo" />
            </a>
        );
    }
}

export default Login;
