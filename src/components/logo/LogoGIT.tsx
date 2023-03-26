import { Component } from 'react';
import logoGIT from './../../assets/github-mark-white.png';
import logo from './Logo.module.css';

class LogoGIT extends Component {
  render() {
    return (
      <div>
        <a href="https://github.com/D1van007">
          <img className={logo.footer_logoGIT} src={logoGIT} alt="logoGIT" />
        </a>
      </div>
    );
  }
}

export default LogoGIT;
