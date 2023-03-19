/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavbarItem.module.css';

interface IProps {
  path: string;
  name: string;
}

class NavbarItem extends Component<IProps> {
  render() {
    return (
      <li className={styles.nav_item}>
        <Link className={styles.nav_item__link} to={this.props.path}>
          {this.props.name}
        </Link>
      </li>
    );
  }
}

export default NavbarItem;
