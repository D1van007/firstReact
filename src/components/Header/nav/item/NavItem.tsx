import { Link } from 'react-router-dom';
import style from './NavItem.module.css';

interface IProps {
  path: string;
  name: string;
}

function NavItem(props: IProps) {
  const { path, name } = props;
  return (
    <li className={style.header_nav__item}>
      <Link to={path}>{name}</Link>
    </li>
  );
}

export default NavItem;
