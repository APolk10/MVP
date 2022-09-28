/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Modal, Button, Typography, Box, Link } from '@mui/material';
// import Carousel from 'react-bootstrap/Carousel';
import Carousel from 'react-material-ui-carousel';

const getCountryISO2 = require('country-iso-3-to-2');

const styleModal = {
  position: 'absolute',
  background: "url('https://www.myfreetextures.com/wp-content/uploads/2011/06/old-paper-floral-parchment-background-texture.jpg')",
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
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
  // const [currentArtist, setCurrentArtist] = React.useState({});
  const [countryData, setCountryData] = React.useState('USA');
  // const [lifeSpans, setLifespans] = React.useState('Long');
  // const [alive, setAliveStatus] = React.useState(true);
  // const [category, setCategory] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchCountryData = (countryToFind) => {
    axios.get(`http://localhost:3001/country/${countryToFind}`)
      .then((response) => {
        console.log(response.data.artists);
        // setCurrentArtist(response.data.artists[0]);
        setArtists(response.data.artists);
        // setAliveStatus(response.data.artists[0]['life-span'].ended);
        // // setCategory(response.data.artists[0].tags[0].name || '');
        setCountryData(`Country Name: ${response.data.artists[0].area.name}`);
        // setLifespans('Born: ' + response.data.artists[0]['life-span'].begin);
      })
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
      <h1 id="country-name">{country ? `${country}?` : ''}</h1>
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
          <Box sx={styleModal} id="modal">
            <Carousel id="carousel" autoPlay={false} navButtonsProps={{ style: { color: 'white', backgroundColor: 'black', opacity: 1 } }}>
              {artists.map((artist) => (

                <Typography key={artist.id} id="modal-modal-title" variant="h6" component="h2">
                  <p id="modal-country">{country}</p>
                  <ul id="modal-data">
                    <li>{artist['sort-name'] ? `English Name: ${artist['sort-name']}` : 'no data'}</li>
                    <li>{artist.name ? `Local Name: ${artist.name}` : 'no data'}</li>
                    <li>{countryData}</li>
                    <li>{artist['life-span'] ? `Born in: ${artist['life-span'].begin}` : 'no data'}</li>
                    <li>{artist['life-span'] ? 'Status: living' : 'Status: deceased'}</li>
                    <li>{artist.tags ? `Genre: ${artist.tags[0].name}` : 'Genre: no data'}</li>
                    <li>__________________________________ </li>
                    {artists.disambiguation}
                    <Button variant="contained" id="modal-button-spotify">
                      <Link
                        href={`https://open.spotify.com/search/${artist['sort-name']}`}
                        color="inherit"
                        rel="noopener"
                        target="_blank"
                      >
                        Click here to find their music!
                      </Link>
                    </Button>
                  </ul>
                </Typography>
              ))}
            </Carousel>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Map;
