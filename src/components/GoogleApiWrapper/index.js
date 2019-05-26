import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    return (
      <>
        <Map
          google={this.props.google}
          initialCenter={{
            lat: -7.9031643,
            lng: -35.9879732
          }}
          onClick={this.onMapClicked}
          zoom={19.75}
        >
          <Marker
            title={'Educandário Sagrado Coração de Jesus'}
            name={'ESCJ'}
            position={{ lat: -7.9031643, lng: -35.9879732 }}
          />
          <InfoWindow visible={false}>
            <div>
              <p>
                Click on the map or drag the marker to select location where the
                incident occurred
              </p>
            </div>
          </InfoWindow>
          {/*}
          <Marker onClick={this.onMarkerClick} name={'Teste'} />

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>Teste</h1>
            </div>
          </InfoWindow>
          {*/}
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAGEEfOGApS5ZFKGM00O6OK4hXMg-kog4A'
})(MapContainer);
