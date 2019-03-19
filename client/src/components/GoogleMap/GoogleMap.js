import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%"
};

class GoogleMap extends Component {
  state = {
    showInfoWindow: false
  };

  onMarkerClick = () => {};
  render() {
    console.log(process.env.REACT_APP_GOOGLE_API_KEY);
    const { showInfoWindow } = this.state;
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: -1.2285,
            lng: 36.8233
          }}
        >
          <Marker
            name={"Your position"}
            position={{ lat: -1.2285, lng: 36.8233 }}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={showInfoWindow}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(GoogleMap);
