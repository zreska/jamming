import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    searchResults: [],
    playListName: 'New Playlist',
    playListTracks: []
};
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlayListName = this.updatePlayListName.bind(this);
  this.savePlayList = this.savePlayList.bind(this);
  this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then(tracks => this.setState({searchResults: tracks}));
  }

  addTrack(track) {
    if(this.state.playListTracks.indexOf(track) === -1) {
      let tracks = this.state.playListTracks;
      tracks.push(track);
      this.setState({playListTracks: tracks});

     let searchList = this.state.searchResults;
     searchList = searchList.filter(savedTrack => savedTrack.id !== track.id);
     this.setState({searchResults: searchList});
    }
  }

  removeTrack(track) {
   let tracks = this.state.playListTracks;
   tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
   this.setState({playListTracks: tracks});
 }

  updatePlayListName(name) {
    this.setState({playListName: name});
  }

  savePlayList() {
    let trackURIs = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playListName, trackURIs).then(() =>
        this.setState({
          playListName: 'New Playlist',
          searchResults: []
          })
            );
        }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults} />
            <PlayList
              playListName={this.state.playListName}
              onNameChange={this.updatePlayListName}
              playListTracks={this.state.playListTracks}
              onRemove={this.removeTrack}
              onSave={this.savePlayList} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
