import React from 'react';

const Album = (props) => {
    const album = props.data;


    return (
        <li className="artist">
            <div className="artist-img">
                <img alt={album.name} src={album.images[0].url} />
            </div>
            <div className=" artist-desc">
                <p className="album-title">{album.name}</p>
                {
                    album.artists.map((item) => {
                        return <p className="album-text name" key={item.id}>{item.name}</p>
                    })
                }
                <div className="album-info">
                    <p className="album-text date"> {album.release_date}</p>
                    <p className="album-text"> {album.total_tracks} tracks</p>
                </div>
            </div>
            <div className="album-link">
                <a className="no-decoration" target="_blank" href={album.external_urls.spotify}>Preview on Spotify</a>
            </div>
        </li>
    );
};

export default Album;