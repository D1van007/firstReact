import { Component } from 'react';
import Logo from '../logo/Logo';
import style from './Header.module.css';
import NavbarItem from '../navbarItem/NavbarItem';

class Header extends Component {
  render() {
    return (
      <header className={style.header}>
        <Logo />
        <nav>
          <ul className={style.header_nav__list}>
            <NavbarItem path="/" name="Main" />
            <NavbarItem path="/people" name="People" />
            <NavbarItem path="/search" name="Search" />
            <NavbarItem path="/about" name="About" />
          </ul>
        </nav>
      </header>
    );
  }
}
export default Header;
