import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";

import "./GoogleMap.css";

const mapStyles = {
  width: "100%",
  height: "100%"
};

class GoogleMap extends Component {
  state = {
    showInfoWindow: false,
    activeMarker: {}
  };
  // This function is used to hide the InfoWindow when a user clicks outside of the marker.
  onMapClick = () => {
    if (this.state.showInfoWindow) {
      this.setState(() => ({
        showInfoWindow: false,
        activeMarker: null
      }));
    }
  };
  // This function is usd to show the InfoWinow when a user clicks on the marker. The activeMarker prop is needed to make sure the position of the InfoWindow is next to the Marker component.
  onMarkerClick = (props, marker, e) => {
    this.setState(() => ({
      showInfoWindow: true,
      activeMarker: marker
    }));
  };
  render() {
    const { showInfoWindow, activeMarker } = this.state;
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 40.73061,
            lng: -73.935242
          }}
          onClick={this.onMapClick}
        >
          <Marker
            name={"Your position"}
            position={{ lat: 40.73061, lng: -73.935242 }}
            onClick={this.onMarkerClick}
          />
          <InfoWindow marker={activeMarker} visible={showInfoWindow}>
            <div className="infoWindowContainer">
              <h2 className="infoWindowHeader">The Espresso Shop!</h2>
              <h6 className="infoWindowSubHeader">52 East 13th St</h6>
              <h6 className="infoWindowSubHeader">New York, NY 10003</h6>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(GoogleMap);
