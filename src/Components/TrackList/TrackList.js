import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component{

  render(){
    if (typeof this.props.tracks === 'undefined') {
           let track = [{
               name: 'Artist or title not found',
               artist: 'Try different search terms',
               album: ' '
           }];

    return(
      <div className="TrackList">
        {this.props.tracks.map(track => {
            return  <Track onAdd={this.props.onAdd}
                     onRemove={this.props.onRemove}
                     key={track.id} track={track} />
          })
        }
      </div>
    );
}
}
}
export default TrackList;
