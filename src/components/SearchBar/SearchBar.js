import React from 'react'
import './SearchBar.css'
import geolocator from 'geolocator'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    }
    this.sortByOptions = {
      "Best Match": "best_match",
      "Highest Rated": "rating",
      "Most Reviewed": "review_count"
    } 
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  getSortByClass(sortByOption) {
    if(this.state.sortBy === sortByOption) {
      return 'active'
    }
    return ''
  }

  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOption
    })
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    })
  }

  handleLocationChange(event) {
    this.setState({
      location: event.target.value
    })
  }

  componentDidMount(){
    var currlocation
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumWait: 10000,     // max wait time for desired accuracy
      maximumAge: 0,          // disable cache
      desiredAccuracy: 30,    // meters
      fallbackToIP: true,     // fallback to IP if Geolocation fails or rejected
    };
    geolocator.locateByIP(options, function (err, location) {
      console.log(location.address.city);
      currlocation=location.address.city
    });
    this.props.searchYelp('food',currlocation,'best_match')
  }
  
  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    event.preventDefault();
  }

  renderSortByOptions(){
    return Object.keys(this.sortByOptions).map((sortByOption) => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return <li key={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>;
    })
  }

  render(){
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" onChange={this.handleTermChange}/>
          <input placeholder="Where?" onChange={this.handleLocationChange}/>
        </div>
        <div className="SearchBar-submit" onClick={this.handleSearch}>
          <a>Let's Go</a>
        </div>
      </div>
    )
  }
}

export default SearchBar