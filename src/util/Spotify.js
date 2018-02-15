const clientId = '9334f2b5ddc44ea5b5d981c3de0521de';
const redirectUri='http://localhost:3000/';

let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
  const access=window.location.href.match(/access_token=([^&]*)/);
  const expires=window.location.href.match(/expires_in=([^&]*)/);
  if(access && expires){
    accessToken=access[1];
    expiresIn=Number(expires[1]);
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
  }else {
    const spotifyURL=`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location = spotifyURL;
  }
},
  search(term){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response=> {
        if(response.ok){
          return response.json();
        } else {
          console.log('API request failed');
        }
    }).then(jsonResponse =>{
      if(!jsonResponse.tracks){
        return[];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        cover: track.ablum.images[2].url,
        preview: track.preview_url
      }));
    });
  },

  savePlayList(playListName, trackUri){
    if(!playListName || !trackUri.length){
      return;
  }
    const accessToken = Spotify.getAccessToken();
    let headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userUrl = 'https://api.spotify.com/v1/me';
    return fetch(userUrl, {
      headers: headers
    }).then(response=>{
      if(response.ok){
        return response.json();
      }
    }).then(jsonResponse=>{
      let userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: playListName})
      }).then(response=>{
        if(response.ok){
          return response.json();
        } else {
          console.log('API request failed');
        }
      }).then(jsonResponse=>{
        const playlistId=jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUri})
        });
      });
    });
  }
}

export default Spotify;

