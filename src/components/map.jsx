/* eslint-disable import/extensions */
import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import CountryModal from './countryModal.jsx';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoURL: 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json',
      country: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const countryName = e.target.getAttribute('name');
    this.setState({
      country: countryName,
    });
  }

  render() {
    const { geoURL, country } = this.state;
    return (
      <div id="world-map">
        <div id="country-modal">
          <CountryModal />
        </div>
        <h1 id="country-name">{country || '___________'}</h1>
        <ComposableMap id="map-canvas">
          <ZoomableGroup center={[0, 0]} zoom={9}>
            <Geographies geography={geoURL}>
              {({ geographies }) => geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  stroke="grey"
                  geography={geo}
                  name={geo.properties.name}
                  onClick={this.handleClick}
                  style={{
                    default: {
                      fill: '#EEE',
                      outline: 'none',
                    },
                    hover: {
                      fill: 'lightblue',
                      outline: 'none',
                    },
                    pressed: {
                      fill: 'green', // modal popup?
                      outline: 'none',
                    },
                  }}
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

export default Map;
