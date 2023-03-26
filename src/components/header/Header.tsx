import { Component } from 'react';
import Logo from '../logo/Logo';
import style from './Header.module.css';
import NavbarItem from './navbarItem/NavbarItem';

class Header extends Component {
  render() {
    return (
      <header className={style.header}>
        <Logo />
        <nav>
          <ul className={style.header_nav__list}>
            <NavbarItem path="/" name="Home" />
            <NavbarItem path="/form" name="Form" />
            <NavbarItem path="/about" name="About" />
          </ul>
        </nav>
      </header>
    );
  }
}
export default Header;
