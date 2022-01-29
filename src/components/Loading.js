import React from 'react';

const loadingSrc = 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif';

class Loading extends React.Component {
  render() {
    return (
      <section className="loading">
        <img src={ loadingSrc } alt="loading" />
      </section>
    );
  }
}

export default Loading;
