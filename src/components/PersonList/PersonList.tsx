/* eslint-disable react/destructuring-assignment */
// import React from 'react';
// import axios from 'axios';

// interface IPeople {
//   id: number;
//   name: string;
//   height: number;
//   mass: number;
//   hairColor: string;
//   skinColor: string;
//   eyeColor: string;
//   birthYear: string;
//   gender: string;
//   homeworld: string;
//   films: string[];
//   species: string[];
//   vehicles: string[];
//   starships: string[];
//   created: string;
//   edited: string;
//   url: string;
// }

// interface IState {
//   people: [];
// }

// class PeopleList extends React.Component<object, IState> {
//   constructor(props: object) {
//     super(props);
//     this.state = { people: [] };
//   }

//   componentDidMount() {
//     axios.get(`https://swapi.dev/api/people`).then((res) => {
//       const people = res.data;
//       console.log(res.data);
//       this.setState({ people });
//     });
//   }

//   render() {
//     return (
//       <ul className="people_list">
//         {this.state.people.map((person: IPeople) => (
//           <li className="people_item" key={person.id}>
//             <div style={{ backgroundColor: 'red' }}>картинка</div>
//             <div>
//               описание
//               <div>{person.name}</div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }

// export default PeopleList;

/* eslint-disable react/destructuring-assignment */
import React from 'react';
import getApiPerson from '../../utils/network';
import styles from './PersonList.module.css';
import { API_PERSON } from '../../constants/api';
import { IPerson, ISwapi } from '../../api/type';
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
      console.log(person);
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
