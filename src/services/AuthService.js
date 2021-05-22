import queryString from "querystring";

export default class AuthService {

    static TOKEN_KEY = 'access-token';
    static SEARCH_STRING = 'artist-query-search';
    static SEARCH_DATA = 'artist-data-search';
    static TOKEN_KEY = 'access-token';
    static my_client_id = '7c3086dc7a4e4a989608596a6745d7d6';
    static AUTHORIZATION_URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${this.my_client_id }&redirect_uri=${window.location.origin}`;

    static getAccessTokenFromRedirect() {

        const params = queryString.parse(window.location.hash.slice(1));            // slice(1) to ignore leading #

        if (params.access_token && typeof params.access_token === 'string') {
            return params.access_token;
        } else {
            return null;
        }

    }

    static getAccessToken() {
        return window.localStorage.getItem(this.TOKEN_KEY);
    }

    static setAccessToken(token) {
        window.localStorage.setItem(this.TOKEN_KEY, token);
    	window.location.hash="";
    }

    static getSearchString() {
        return window.localStorage.getItem(this.SEARCH_STRING);
    }

    static getSearchData() {
        return window.localStorage.getItem(this.SEARCH_DATA)? JSON.parse(window.localStorage.getItem(this.SEARCH_DATA)) : [];
    }

    static storeArtistSearchData(value, data) {
    	window.localStorage.setItem(this.SEARCH_STRING, value);
    	window.localStorage.setItem(this.SEARCH_DATA, JSON.stringify(data));
    }

    static isLoggedIn() {
        return !!this.getAccessToken();
    };

    static logout() {
        window.localStorage.removeItem(this.TOKEN_KEY);
    };
}
