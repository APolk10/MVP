/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Modal, Button, Typography, Box } from '@mui/material';
const getCountryISO2 = require('country-iso-3-to-2');

const styleModal = {
  position: 'absolute',
  background: "url('https://www.myfreetextures.com/wp-content/uploads/2011/06/old-paper-floral-parchment-background-texture.jpg')",
  'background-size': '70vw 40vw',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70vw',
  height: '40vw',
  bgcolor: 'background.paper',
  border: '4px solid #000',
  boxShadow: 24,
  p: 4,
};

const styleMap = {
  default: {
    fill: '#EEE',
    outline: 'none',
  },
  hover: {
    fill: 'lightblue',
    outline: 'none',
  },
  pressed: {
    fill: 'green',
    outline: 'none',
  },
};

const mapURL = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json';

function Map() {
  const [geoURL] = React.useState(mapURL);
  const [country, setCountry] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [artists, setArtists] = React.useState([]);
  const [countryData, setCountryData] = React.useState('');
  const [lifeSpans, setLifespans] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchCountryData = (countryToFind) => {
    axios.get(`http://localhost:3001/country/${countryToFind}`)
      .then((response) => { console.log(response.data.artists[0]); setArtists(response.data.artists[0]); })
      .then(() => { handleOpen(); })
      .catch((error) => console.log(error));
  };

  const handleCountryClick = (e) => {
    const currentCountry = e.target.getAttribute('name');
    const currentCountryISO = getCountryISO2(e.target.getAttribute('iso'));
    setCountry(currentCountry);
    fetchCountryData(currentCountryISO);
  };

  return (
    <div id="world-map">
      <h1 id="country-name">{(country || '___________') + '?'}</h1>
      <ComposableMap id="map-canvas">
        <ZoomableGroup center={[10, 10]} zoom={1.4}>
          <Geographies geography={geoURL}>
            {({ geographies }) => geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                stroke="grey"
                geography={geo}
                name={geo.properties.name}
                iso={geo.id}
                onClick={handleCountryClick}
                style={styleMap}
              />
            ))}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {artists['sort-name']}
              {artists['name']}
              {JSON.stringify(artists['life-span'])}
              {JSON.stringify(artists.area)}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Map;
