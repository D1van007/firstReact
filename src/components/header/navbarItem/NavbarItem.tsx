/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavbarItem.module.css';

interface IProps {
  path: string;
  name: string;
}

class NavbarItem extends Component<IProps> {
  render() {
    return (
      <li className={styles.nav_item}>
        <NavLink
          className={styles.nav_item__link}
          style={({ isActive }) => {
            return { color: isActive ? '#ffe917' : 'aliceblue' };
          }}
          to={this.props.path}
        >
          {this.props.name}
        </NavLink>
      </li>
    );
  }
}

export default NavbarItem;
