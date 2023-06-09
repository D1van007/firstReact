import { Component } from 'react';
import logoStation from './../../assets/space-station.svg';
import logo from './Logo.module.css';

class Logo extends Component {
  render() {
    return (
      <div>
        <img
          className={logo.header_logo__station}
          src={logoStation}
          alt="logo-station"
        />
      </div>
    );
  }
}

export default Logo;
