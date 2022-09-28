/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import Map from './components/map.jsx';

function App() {
  return (
    <div id="page">
      <div id="container">
        <h1 id="title">What Are People Listening To in...</h1>
        <div id="map">
          <Map />
        </div>
      </div>
    </div>

  );
}

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'));
