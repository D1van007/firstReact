/* eslint-disable @typescript-eslint/naming-convention */
import styles from './CardExtended.module.css';
import { IFilms, IPerson } from '../../types/type';
import { IMG_EXTENSION, IMG_PERSON_URL } from '../../constants/api';
import pickUpPersonID from '../../utils/personID';

interface IProps {
  person: IPerson;
  homeworldPerson: string;
  personFilmsList: IFilms[] | string;
}

function CardExtended({ person, homeworldPerson, personFilmsList }: IProps) {
  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    id,
    url,
    checkbox,
  } = person as IPerson;

  const imgUrl = checkbox
    ? (url as string)
    : IMG_PERSON_URL + pickUpPersonID(url).slice(0, -1) + IMG_EXTENSION;

  return (
    <div className={styles.person_content} key={name}>
      <h2 className={styles.person_name}>{name}</h2>

      <div className={styles.person_info}>
        <div className={id ? styles.person_foto : styles.myPerson_foto}>
          <img src={imgUrl} alt={name} />
        </div>

        <div
          className={
            id ? styles.person_description : styles.myPerson_description
          }
        >
          <h3>Description:</h3>
          <ul className={styles.person_description__list}>
            {homeworldPerson && <li>Homeworld: {homeworldPerson}</li>}
            {gender && <li>Gender: {gender}</li>}
            {height && <li>Height: {`${height}cm`}</li>}
            {mass && <li>Mass: {`${mass}kg`}</li>}
            {hair_color && <li>Hair color: {hair_color}</li>}
            {skin_color && <li>Skin color: {skin_color}</li>}
            {eye_color && <li>Eye color: {eye_color}</li>}
            {birth_year && <li>Date of birth: {birth_year}</li>}
          </ul>
        </div>

        <div className={styles.person_films}>
          <h3>Films:</h3>
          <ul className={styles.person_films__list}>
            {typeof personFilmsList !== 'string' ? (
              personFilmsList
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
                })
            ) : (
              <span>{personFilmsList}</span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardExtended;
