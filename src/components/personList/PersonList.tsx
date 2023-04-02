import { useEffect, useState } from 'react';
import { getApiPerson } from '../../utils/network';
import styles from './PersonList.module.css';
import { API_PERSON } from '../../constants/api';
import { IPerson, ISwapi } from '../../types/type';
import Card from '../card/Card';

function PeopleList() {
  const [person, setPerson] = useState<IPerson[] | []>([]);

  useEffect(() => {
    const createdPerson =
      (JSON.parse(
        localStorage.getItem('createdPerson') as string
      ) as IPerson[]) || [];

    getApiPerson(API_PERSON).then((res) => {
      const personsRes = ((res as ISwapi).results as IPerson[]) || [];
      const personJoint = [...personsRes, ...createdPerson];
      setPerson(personJoint);
    });
  }, []);

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
