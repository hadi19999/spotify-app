import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthService from '../services/AuthService';

import NavBar from './NavBar';
import Login from './Login';
import Search from './Search';
import ArtistAlbums from './ArtistAlbums';

class Main extends Component {
	
	state = {
        isLoggedIn: AuthService.isLoggedIn() 
    };

    componentDidMount() {
        const token = AuthService.getAccessTokenFromRedirect();
        if (token) {
            this.setAccessToken(token);
        }
    }

    setAccessToken(token) {
        AuthService.setAccessToken(token);
        this.setState({
            isLoggedIn: true
        });
    }

    logout = () => {
        AuthService.logout();
        this.setState({
            isLoggedIn: false
        });
    };

	render() {
		return (
			<div className="content">
				<NavBar />
				<div className="container page-content">
					<div className="row">
						<div className="col-md-12 col-md-offset-1">
							 {this.props.children}
							<Switch>
					            <Route exact path="/" render={props => (
	                                this.state.isLoggedIn ?
	                                    <div className="search-container"><Search /></div>:<Login/>
	                            )}/>
					            <Route exact path="/search" render={props => (
                                this.state.isLoggedIn ? <Search /> : <div>Access Denied</div>
	                            )}/>
	                            <Route exact path="/artistInfo/:id/" render={(props) =>  (
	                                this.state.isLoggedIn ? <ArtistAlbums /> : <div>Access Denied</div>
	                            )}/>
					        </Switch>
						</div>
					</div>
				</div>
			</div>
			)
	}
}

export default Main;
