import { NavLink } from 'react-router-dom';
import styles from './NavbarItem.module.css';

interface IProps {
  path: string;
  name: string;
}

function NavbarItem(props: IProps) {
  const { path, name } = props;
  return (
    <li className={styles.nav_item}>
      <NavLink
        className={styles.nav_item__link}
        style={({ isActive }) => {
          return { color: isActive ? '#ffe917' : 'aliceblue' };
        }}
        to={path}
      >
        {name}
      </NavLink>
    </li>
  );
}

export default NavbarItem;
