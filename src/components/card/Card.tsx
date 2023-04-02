import { useEffect, useState } from 'react';
import styles from './Card.module.css';
import { IHomeworld, IPerson } from '../../types/type';
import { IMG_EXTENSION, IMG_PERSON_URL } from '../../constants/api';
import getPersonID from '../../utils/personID';
import { getPlanetPerson } from '../../utils/network';

function Card(props: IPerson) {
  const [home, setHome] = useState<IHomeworld | []>([]);
  const { name, url, gender, homeworld, birthYear, checkbox } = props;

  useEffect(() => {
    getPlanetPerson(homeworld).then((e) => {
      const homeworldRes = e as IHomeworld;
      setHome(homeworldRes);
    });
  });

  const imgUrl =
    checkbox === true
      ? (url as string)
      : IMG_PERSON_URL +
        getPersonID((url as string).slice(0, -1)) +
        IMG_EXTENSION;
  const homeworldPers =
    checkbox && home ? homeworld : (home as IHomeworld).name;

  return (
    <li className={styles.person_item} key={name}>
      <img className={styles.person_foto} src={imgUrl} alt={name} />
      <div>
        <h3>{name}</h3>
        <h4>Date of birth: {birthYear}</h4>
        <h4>Homeword: {homeworldPers}</h4>
        <h4>Gender: {gender}</h4>
      </div>
    </li>
  );
}

export default Card;
