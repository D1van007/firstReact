import { useEffect, useState } from 'react';
import { getApiPerson } from '../../utils/network';
import styles from './PersonList.module.css';
import { API_PERSON } from '../../constants/api';
import { IPerson, ISwapi } from '../../types/type';
import Card from '../card/Card';

interface Props {
  textFromSearch: string;
}

function PeopleList({ textFromSearch }: Props) {
  const [person, setPerson] = useState<IPerson[] | []>([]);

  useEffect(() => {
    const createdPerson =
      (JSON.parse(
        localStorage.getItem('createdPerson') as string
      ) as IPerson[]) || [];

    const personApi = textFromSearch
      ? `${API_PERSON}/?search=${textFromSearch}`
      : API_PERSON;

    getApiPerson(personApi).then((res) => {
      const personsRes = ((res as ISwapi).results as IPerson[]) || [];
      const personJoint = [...personsRes, ...createdPerson];
      setPerson(personJoint);
    });
  }, [textFromSearch]);

  return (
    <ul className={styles.person_list}>
      {person.map(
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

export default PeopleList;
