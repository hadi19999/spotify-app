import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import $ from 'jquery';
import AuthService from '../services/AuthService';
import Album from './Album'

class ArtistAlbums extends Component {

	state = {
		activeArtistId: this.props.match.params.id,
		artistInfo: null,
		artistName: '',
		artistAlbums: []
	};

	componentDidMount() {
		this.getArtistInfo(this.state.activeArtistId);
	}

	getArtistInfo(id) {
		const that = this;
		$.ajax({
			url: 'https://api.spotify.com/v1/artists/' + id,
			type: 'get',
			data: {
				id: id,
			},
			headers: {
				"Authorization": "Bearer " + AuthService.getAccessToken()
			},
			dataType: 'json',
			success: function (data) {
				that.setState({
					artistInfo: data,
					artistName: data.name,
				});
				that.getArtistAlbums(id);
			},
			error: function () {
					AuthService.logout();
					window.location.href = "/";
			}
		});
	}

	getArtistAlbums(id) {
		const that = this;

		$.ajax({
			url: 'https://api.spotify.com/v1/artists/' + id + '/albums',
			type: 'get',
			data: {
				id: id,
			},
			headers: {
				"Authorization": "Bearer " + AuthService.getAccessToken()
			},
			dataType: 'json',
			success: function (data) {
				console.log(data);
				that.setState({
					artistAlbums: data.items
				});
			},
			error: function () {
				AuthService.logout();
				window.location.href = "/";
			}
		});
	}

	render() {
		return (
			<div>
				<h1 className="artist-info">{this.state.artistName}</h1>
				<h3 className="artist-info no-decoration">Albums</h3>
				<ul>
					{
						this.state.artistAlbums.map((item, key) => {
							return <Album key={item.id} data={item} />
						})
					}
				</ul>
			</div>
		);
	}
}

export default withRouter(ArtistAlbums)