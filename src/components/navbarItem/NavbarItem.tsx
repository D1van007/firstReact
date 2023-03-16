/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './NavbarItem.module.css';

interface IProps {
  path: string;
  name: string;
}

class NavbarItem extends Component<IProps> {
  render() {
    return (
      <li className={style.header_nav__item}>
        <Link to={this.props.path}>{this.props.name}</Link>
      </li>
    );
  }
}

export default NavbarItem;
