import style from './Nav.module.css';
import NavItem from '../item/NavItem';

function Nav() {
  return (
    <nav>
      <ul className={style.header_nav__list}>
        <NavItem path="/" name="Main" />
        <NavItem path="/people" name="People" />
        <NavItem path="/search" name="Search" />
        <NavItem path="/about" name="About" />
      </ul>
    </nav>
  );
}

export default Nav;
