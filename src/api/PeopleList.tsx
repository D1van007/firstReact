/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';

interface IPeople {
  id: number;
  name: string;
  height: number;
  mass: number;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface IState {
  people: [];
}

class PeopleList extends React.Component<object, IState> {
  constructor(props: object) {
    super(props);
    this.state = { people: [] };
  }

  componentDidMount() {
    axios.get(`https://ajax.test-danit.com/api/swapi/people`).then((res) => {
      const people = res.data;
      this.setState({ people });
    });
  }

  render() {
    return (
      <ul>
        {this.state.people.map((person: IPeople) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    );
  }
}

export default PeopleList;
