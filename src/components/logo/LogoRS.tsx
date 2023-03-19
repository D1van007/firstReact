import { Component } from 'react';
import logoRS from './../../assets/logo-rs.svg';
import logo from './Logo.module.css';

class LogoRS extends Component {
  render() {
    return (
      <div>
        <a href="https://rs.school/">
          <img className={logo.footer_logoRS} src={logoRS} alt="logoRS" />
        </a>
      </div>
    );
  }
}

export default LogoRS;
