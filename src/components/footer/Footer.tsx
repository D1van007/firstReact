import { Component } from 'react';
import style from './Footer.module.css';
import LogoRS from '../logo/LogoRS';
import LogoGIT from '../logo/LogoGIT';

class Footer extends Component {
  render() {
    return (
      <footer className={style.footer}>
        <LogoGIT />
        <LogoRS />
      </footer>
    );
  }
}
export default Footer;
