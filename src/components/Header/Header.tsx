import Logo from './logo/Logo';
import style from './Header.module.css';
import Nav from './nav/list/Nav';

function Header() {
  return (
    <header className={style.header}>
      <Logo />
      <Nav />
    </header>
  );
}

export default Header;
