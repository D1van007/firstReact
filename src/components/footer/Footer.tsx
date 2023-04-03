import style from './Footer.module.css';
import LogoRS from '../logo/LogoRS';
import LogoGIT from '../logo/LogoGIT';

function Footer() {
  return (
    <footer className={style.footer}>
      <LogoGIT />
      <LogoRS />
    </footer>
  );
}
export default Footer;
