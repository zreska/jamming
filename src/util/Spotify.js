const clientId = '9334f2b5ddc44ea5b5d981c3de0521de';
const redirectUri='http://localhost:3000/';

let accessToken;
let expiresIn;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const access = window.location.href.match(/access_token=([^&]*)/);
    const expires = window.location.href.match(/expires_in=([^&]*)/);
    if (access && expires) {
      accessToken = access[1];
      const expiresIn = Number(expires[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uriL
        }));
    });
  },

  savePlayList(playListName, trackURIs) {
      if (!playListName || !trackURIs.length) {
        return;
      }
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      let userId;
      return fetch('https://api.spotify.com/v1/me', {headers: headers} //get spotify user id
      ).then(response => response.json()
      ).then(jsonResponse => {
        userId = jsonResponse.id;
        console.log(jsonResponse);
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          contentType: 'application/json',
          method: 'POST',
          body: JSON.stringify({name: playListName})
        }).then(response => response.json()
        ).then(jsonResponse => {
          const playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            contentType: 'application/json',
            method: 'POST',
            body: JSON.stringify({uris: trackURIs})

          });
        });
});
}
};

export default Spotify;
