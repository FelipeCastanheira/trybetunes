import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        Search
        <Header nav="search" />
      </div>
    );
  }
}

export default Search;
