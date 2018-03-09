import { h, Component } from 'preact';
import style from './style';
import GoogleMapReact from 'google-map-react';
import {geolocated} from 'react-geolocated';


export class SimpleMap extends Component {
  static defaultProps = {
    center: {lat: this.props.coords.latitude., this.props.coords.longitude},
    zoom: 11
  };

  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: [AIzaSyAYsmE7u7ZbYvGKxlOWUV7GNHLjJDxgmFA] }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={this.props.coords.latitude}
          lng={this.props.coords.longitude}
          text={'Sport activities'}
        />
      </GoogleMapReact>
    );
  }
}