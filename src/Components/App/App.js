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
      }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let currPlayList = this.state.playListTracks.concat(track);
    this.setState({playListTracks: currPlayList});
  }

  removeTrack(track){
    let currPlayList = this.state.playListTracks;
    this.setState({playListTracks: currPlayList.filter(checkTrack=> checkTrack.id !== track.id)});
  }

  updatePlayListName(name){
    this.setState({playListName: name});
  }

  savePlayList(){
    let trackUri = this.state.playListTracks.map(track => track.uri);
    if(this.state.playListName && trackUri && trackUri.length > 0){
      Spotify.savePlayList(this.state.playListName, trackUri).then(()=>{
        console.log(`${this.state.playListName} saved to play list.`);
        this.setState({playListName: 'New Playlist', playListTracks: []});
      });
    }

  }

  search(term){
    Spotify.search(term).then(tracks=> this.setState({searchResults: tracks}));
  }

  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      <SearchBar onSearch={this.search}/>
      <div className="App-playlist">
      <SearchResults onAdd={this.addTrack}/>
      <PlayList
        playListName={this.state.playListName}
        playListTracks={this.state.playListTracks}
        onAdd={this.addTrack}
        onRemove={this.removeTrack}
        onNameChange={this.updatePlayListName}
        />
    </div>
  </div>
</div>
    );
  }
}

export default App;
