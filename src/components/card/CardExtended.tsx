/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import styles from './CardExtended.module.css';
import { IFilms, IHomeworld, IPerson } from '../../types/type';
import { API_PERSON, IMG_EXTENSION, IMG_PERSON_URL } from '../../constants/api';
import getApiResource, { makeRequest } from '../../utils/network';
import Loading from '../UI/UILoading/Loading';

interface IProps {
  personID: string | null;
  personName: string;
}

function CardExtended({ personID, personName }: IProps) {
  const [personInfo, setPersonInfo] = useState<IPerson | []>([]);
  const [home, setHome] = useState<IHomeworld | string | []>([]);
  const [personFilms, setPersonFilms] = useState<IFilms[] | []>([]);
  const [isPopup, setIsPopup] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld,
    films,
    url,
  } = personInfo as IPerson;

  const personApi = `${API_PERSON}${personID}`;

  let imgUrl;
  let homeworldPers;

  useEffect(() => {
    if (personID) {
      getApiResource(personApi).then((res) => {
        if (res) {
          setPersonInfo(res as IPerson);
        }
      });
    }
  }, []);

  if (!personID) {
    useEffect(() => {
      setIsFetching(false);
      const person = (
        JSON.parse(localStorage.getItem('createdPerson') as string) as IPerson[]
      ).find((e) => {
        return e.name === personName;
      });
      setPersonInfo(person as IPerson);
    }, []);
    imgUrl = url;
    homeworldPers = homeworld;
  } else {
    useEffect(() => {
      getApiResource(homeworld).then((e) => {
        const homeworldRes = e as IHomeworld;
        setHome(homeworldRes);
      });
    }, [personInfo]);

    useEffect(() => {
      if (films) {
        (async () => {
          const res = await makeRequest(films);
          setIsFetching(false);
          setPersonFilms(res as IFilms[]);
        })();
      }
    }, [personInfo]);

    imgUrl = IMG_PERSON_URL + personID + IMG_EXTENSION;

    homeworldPers = (home as IHomeworld).name;
  }

  const handleClick = () => {
    if (!isPopup) {
      setIsPopup(true);
    }
  };

  return isFetching ? (
    <Loading />
  ) : (
    <div
      className={styles.person_content}
      key={name}
      onClick={handleClick}
      role="presentation"
    >
      <h2 className={styles.person_name}>{name}</h2>

      <div className={styles.person_info}>
        <div className={personID ? styles.person_foto : styles.myPerson_foto}>
          <img src={imgUrl} alt={name} />
        </div>

        <div
          className={
            personID ? styles.person_description : styles.myPerson_description
          }
        >
          <h3>Description:</h3>
          <ul className={styles.person_description__list}>
            {homeworldPers && <li>Homeworld: {homeworldPers}</li>}
            {gender && <li>Gender: {gender}</li>}
            {height && <li>Height: {`${height}cm`}</li>}
            {mass && <li>Mass: {`${mass}kg`}</li>}
            {hair_color && <li>Hair color: {hair_color}</li>}
            {skin_color && <li>Skin color: {skin_color}</li>}
            {eye_color && <li>Eye color: {eye_color}</li>}
            {birth_year && <li>Date of birth: {birth_year}</li>}
          </ul>
        </div>

        {personID && (
          <div className={styles.person_films}>
            <h3>Films:</h3>
            <ul className={styles.person_films__list}>
              {personFilms
                .sort((a, b) => {
                  return a.episode_id - b.episode_id;
                })
                .map((e: IFilms) => {
                  return (
                    <li key={`${e.episode_id}`}>
                      <span>Episode {e.episode_id}. </span>
                      <span>{`"${e.title}"`}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardExtended;
