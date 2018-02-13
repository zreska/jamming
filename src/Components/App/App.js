import React from 'react';
import Spotify from '../../util/Spotify';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/Playlist';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      seachResults: [],
      playListName: 'New Playlist',
      playListTracks: []
    };
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
  }

    search(term){
      Spotify.search(term).then(searchResults => {
     this.setState({searchResults: searchResults});
   });
    }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track){
    let tracks = this.state.playListTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playListTracks: tracks});
  }

  updatePlayListName(name){
    this.setState({playListName: name});
  }

  savePlayList(){
    const trackUri = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playListName, trackUri).then(() => {
      this.setState({
        playListName: 'New Playlist',
        playListTracks: [],
        searchResults: [{
          name: 'Playlist saved to Spotify',
          album: '',
          artist: 'Enter search terms'
        }]
      });
    });

  }

  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      <SearchBar onSearch={this.search}/>
      <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack} />
            <PlayList playListTracks={this.state.playListTracks}
                      onNameChange={this.updatePlayListName}
                      onRemove={this.removeTrack}
                      onSave={this.savePlayList} />
    </div>
  </div>
</div>
    );
  }
}

export default App;
