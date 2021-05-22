import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import search_icon from './search_icon.svg';
import Artist from './Artist';
import $ from 'jquery';

class Search extends Component {


	constructor() {
		super();
		this.state = {
			queryString: AuthService.getSearchString(),
			artists: AuthService.getSearchData()
		};
	}

	getSearchedArtist() {
		const that = this;
		const val = $('#search-artist').val();
		this.state.queryString = val

		if (val === '') {
			that.setState({
				artists: []
			});
			return;
		}
		$.ajax({
			url: 'https://api.spotify.com/v1/search',
			type: 'get',
			data: {
				type: 'artist',
				q: val,
			},
			headers: {
				"Authorization": "Bearer " + AuthService.getAccessToken()
			},
			dataType: 'json',
			success: function (data) {
				that.updateArtistsList(val, data.artists.items);
			},
			error: function () {
				AuthService.logout()
				window.location.href = "/";
			}

		});
	};
	updateArtistsList(value, data) {
		this.setState({
			artists: data,
			queryString: value,
		});

		AuthService.storeArtistSearchData(value, data);
	}

	render() {
		return (
			<div>
				<div className={$('#search-artist').val() || this.state.queryString ? "search-input-top" : "search-input"}>
					<input defaultValue={this.state.queryString} id="search-artist" className="form-control" type="search" placeholder="Search for an artist…" onKeyUp={() => this.getSearchedArtist()} />
					<button className="search-button" type="submit"><img onClick={() => this.getSearchedArtist()} type="submit" src={search_icon} className="search-icon" alt="logo" /></button>
				</div>
				<div className="artists-result">
					<ul className="list-artists">
						{
							this.state?.artists?.map((item) => {
								return <Artist key={item.id} data={item} />
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default Search;
