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

  onMapClick = () => {
    if (this.state.showInfoWindow) {
      this.setState(() => ({
        showInfoWindow: false
      }));
    }
  };

  onMarkerClick = () => {
    this.setState(() => ({
      showInfoWindow: true
    }));
  };
  render() {
    const { showInfoWindow } = this.state;
    console.log(showInfoWindow);
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
          onClick={this.onMapClick}
        >
          <Marker
            name={"Your position"}
            position={{ lat: -1.2285, lng: 36.8233 }}
            onClick={this.onMarkerClick}
          />
          <InfoWindow marker={this.state.activeMarker} visible={showInfoWindow}>
            <div>
              <h2>The Espress Shop!</h2>
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
