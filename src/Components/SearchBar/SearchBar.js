import React from 'react';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term:''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  search(event){
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event){
    this.search(event.target.value);
  }

  render(){
    return(
      <div className="SearchBar">
      <input 
      placeholder="Enter A Song, Album, or Artist"
      onChange={this.handleTermChange} />
      <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
