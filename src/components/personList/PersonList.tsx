/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { getApiPerson } from '../../utils/network';
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
    const createdPerson = (JSON.parse(
      localStorage.getItem('createdPerson') as string
    ) as IPerson[])
      ? (JSON.parse(
          localStorage.getItem('createdPerson') as string
        ) as IPerson[])
      : [];

    getApiPerson(API_PERSON).then((res) => {
      const person = [
        ...((res as ISwapi).results as IPerson[]),
        ...createdPerson,
      ];
      this.setState({ person });
    });
  }

  render() {
    return (
      <ul className={styles.person_list}>
        {this.state.person.map(
          ({ name, url, birth_year, homeworld, gender, checkbox }, i) => (
            <Card
              key={`${name}_${+i}`}
              name={`${name}`}
              url={`${url}`}
              birth_year={`${birth_year}`}
              homeworld={`${homeworld}`}
              gender={`${gender}`}
              checkbox={checkbox}
            />
          )
        )}
      </ul>
    );
  }
}

export default PeopleList;
