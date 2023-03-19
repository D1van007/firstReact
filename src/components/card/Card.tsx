/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import styles from './Card.module.css';
import { IPerson } from '../../api/type';
import { IMG_EXTENSION, IMG_PERSON_URL } from '../../constants/api';
import getPersonID from '../../utils/personID';

class Card extends Component<IPerson> {
  render() {
    return (
      <li className={styles.person_item} key={this.props.name}>
        <img
          className={styles.person_foto}
          src={`${
            IMG_PERSON_URL +
            getPersonID(this.props.url.slice(0, -1)) +
            IMG_EXTENSION
          }`}
          alt={this.props.name}
        />
        <div>
          <h3>{this.props.name}</h3>
          <h4>Date of birth: {this.props.birth_year}</h4>
        </div>
      </li>
    );
  }
}

export default Card;
