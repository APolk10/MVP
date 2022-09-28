/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import Map from './components/map.jsx';
import SideBar from './components/sideBar.jsx';

function App() {
  return (
    <div id="page">
      <div id="container">
        {/* <div id="sideBar">
          <SideBar />
        </div> */}
        <h1 id="title">What Are People Listening To in...</h1>
        <div id="barAndMap">
          <div id="map">
            <Map />
          </div>
        </div>
      </div>
    </div>

  );
}

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'));
