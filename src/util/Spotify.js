import React from 'react';

let clientId = '9334f2b5ddc44ea5b5d981c3de0521de';
let clientSecret='defbc49bfa9645c7825fa5892afa9754';
let redirectUri='http://localhost:3000/';
let spotifyURL='https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}';

let accessToken;
let expiresIn;

const Spotify ={
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
  const access=window.location.href.match(/access_token=([^&]*)/);
  const expires=window.location.href.match(/expires_in=([^&]*)/);
  if(access && expires){
    accessToken=access[1];
    expiresIn=expires[1];
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
  }else {
    window.location = spotifyURL;
  }
},
  search(term){
    let searchURL=`https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch(searchURL, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response=> response.json()).then(jsonResponse=>{
      if(!jsonResponse.tracks){
        return [];
      }else {
        return jsonResponse.tracks.items.map(function(track){
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
      }
    });
  },

  savePlayList(playListName, trackUriArr){
    if(!playListName || !trackUriArr){
      return;
  }
    let userToken;
    let headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userId;
    let playListId;
    let userUrl = 'https://api.spotify.com/v1/me';
    fetch(userUrl, {
      headers: headers
    }).then(response=>response.json()).then(jsonResponse=>userId = jsonResponse.id).then(()=>{
      const createPlayList = `https://api.spotify.com/v1/users/${userId}/playlists`;
      fetch(createPlayList, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name: playListName
          })
      }).then(response => response.json()).then(jsonResponse=>playListId = jsonResponse.id).then(()=>{
        const playListTrackUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`;
        fetch(playListTrackUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            uris: trackUriArr
          })
        });
      })
    })
    }
};



export default Spotify;
