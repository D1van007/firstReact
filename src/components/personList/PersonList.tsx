import { useEffect, useState } from 'react';
import getApiResource from '../../utils/network';
import styles from './PersonList.module.css';
import { API_PERSON } from '../../constants/api';
import { IPerson, ISwapi } from '../../types/type';
import Loading from '../UI/UILoading/Loading';
import Card from '../card/Card';

interface Props {
  textFromSearch: string;
}

function PersonList({ textFromSearch }: Props) {
  const [person, setPerson] = useState<IPerson[] | []>([]);
  const [isFetching, setIsFetching] = useState(true);

  const createdPerson =
    (
      JSON.parse(localStorage.getItem('createdPerson') as string) as IPerson[]
    )?.filter((e) =>
      e.name.toLowerCase().includes(textFromSearch.toLowerCase())
    ) || [];

  useEffect(() => {
    const personApi = textFromSearch
      ? `${API_PERSON}/?search=${textFromSearch}`
      : API_PERSON;
    getApiResource(personApi).then((res) => {
      if (res) {
        const personsRes = (res as ISwapi).results as IPerson[];
        const personJoint = [...personsRes, ...createdPerson];
        setPerson(personJoint);
        setIsFetching(false);
      } else {
        setPerson(createdPerson);
      }
    });
  }, [textFromSearch]);

  return isFetching ? (
    <Loading />
  ) : (
    <ul className={styles.person_list}>
      {person &&
        person.map(
          ({ name, url, birth_year, homeworld, gender, checkbox }, i) => (
            <Card
              key={`${name}_${+i}`}
              name={name}
              url={url}
              birth_year={birth_year}
              homeworld={homeworld}
              gender={gender}
              checkbox={checkbox}
            />
          )
        )}
    </ul>
  );
}

export default PersonList;
