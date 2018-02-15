import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class PlayList extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  render(){
    return(
      <div className="Playlist">
      <input
      defaultValue={this.props.playListName}
      onChange={this.handleNameChange}/>
      <TrackList
        tracks={this.props.playListTracks}
        onRemove={this.props.onRemove}
      />
      <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default PlayList;
