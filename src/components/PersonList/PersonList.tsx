/* eslint-disable react/destructuring-assignment */
import React from 'react';
import getApiPerson from '../../utils/network';
import styles from './PersonList.module.css';
import { API_PERSON } from '../../constants/api';
import { IPerson, ISwapi } from '../../types/type';
import Card from '../card/Card';

interface IState {
  person: [] | IPerson[];
}

class PeopleList extends React.Component<object, IState> {
  constructor(props: object) {
    super(props);
    this.state = { person: [] };
  }

  componentDidMount() {
    getApiPerson(API_PERSON).then((res) => {
      const person = (res as ISwapi).results as IPerson[];
      this.setState({ person });
    });
  }

  render() {
    return (
      <ul className={styles.person_list}>
        {this.state.person.map(({ name, url, birth_year }) => (
          <Card
            key={`${name}`}
            name={`${name}`}
            url={`${url}`}
            birth_year={`${birth_year}`}
          />
        ))}
      </ul>
    );
  }
}

export default PeopleList;
