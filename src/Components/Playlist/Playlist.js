import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
  }

  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  render(){
    return(
      <div classname="Playlist">
      <input
      defaultValue={'New Playlist'}
      onChange={this.handleNameChange}/>
      <TrackList
        tracks={this.props.tracks}
        onRemove={this.props.onRemove}
      />
      <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
</div>
    );
  }
}

export default Playlist;
