import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoURL: 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json',
    };
    this.handleClick = this.handleClick.bind(this);
  }

handleClick(e) {
    console.log(e.target.getAttribute('name'));
  }

  render() {
    const { geoURL } = this.state;
    return (
      <div id="world-map">
        <ComposableMap>
          <Geographies geography={geoURL}>
            {({ geographies }) => geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                stroke="black"
                geography={geo}
                name={geo.properties.name}
                onClick={this.handleClick}
                style={{
                  default: {
                    fill: '#EEE',
                    outline: 'none',
                  },
                  hover: {
                    fill: 'green',
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
        </ComposableMap>
      </div>
    );
  }
}

export default Map;
