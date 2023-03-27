/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import styles from './Card.module.css';
import { IHomeword, IPerson } from '../../types/type';
import { IMG_EXTENSION, IMG_PERSON_URL } from '../../constants/api';
import getPersonID from '../../utils/personID';
import { getPlanetPerson } from '../../utils/network';

interface IState {
  homeworld: IHomeword | '';
}
class Card extends Component<IPerson, IState> {
  constructor(props: IPerson) {
    super(props);
    this.state = { homeworld: '' };
  }

  componentDidMount() {
    getPlanetPerson(this.props.homeworld as string).then((e) => {
      const homeworld = e as IHomeword;
      this.setState({ homeworld });
    });
  }

  render() {
    const imgUrl =
      this.props.checkbox === true
        ? (this.props.url as string)
        : IMG_PERSON_URL +
          getPersonID((this.props.url as string).slice(0, -1)) +
          IMG_EXTENSION;
    const homeword =
      this.props.checkbox === true
        ? this.props.homeworld
        : (this.state.homeworld as IHomeword).name;
    return (
      <li className={styles.person_item} key={this.props.name}>
        <img
          className={styles.person_foto}
          src={imgUrl}
          alt={this.props.name}
        />
        <div>
          <h3>{this.props.name}</h3>
          <h4>Date of birth: {this.props.birth_year}</h4>
          <h4>Homeword: {homeword}</h4>
          <h4>Gender: {this.props.gender}</h4>
        </div>
      </li>
    );
  }
}

export default Card;
