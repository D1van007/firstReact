/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import styles from './Card.module.css';
import { IHomeworld, IPerson } from '../../types/type';
import { IMG_EXTENSION, IMG_PERSON_URL } from '../../constants/api';
import getPersonID from '../../utils/personID';
import getApiResource from '../../utils/network';
import Popup from '../popup/Popup';

function Card(props: IPerson) {
  const [home, setHome] = useState<IHomeworld | []>([]);
  const [isPopup, setIsPopup] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const { name, url, gender, homeworld, birth_year, checkbox } = props;

  useEffect(() => {
    (async () => {
      const res = await getApiResource(homeworld);
      if (res) {
        setHome(res as IHomeworld);
        setIsFetching(false);
        setError('');
      } else {
        setError('Error!');
        setIsFetching(false);
      }
    })();
  }, []);

  const handleClick = () => {
    if (!isPopup) {
      setIsPopup(true);
    }
  };

  const closePopup = (bool: boolean) => {
    setIsPopup(bool);
  };

  const personID = !checkbox ? getPersonID((url as string).slice(0, -1)) : null;

  const imgUrl =
    checkbox === true
      ? (url as string)
      : IMG_PERSON_URL + personID + IMG_EXTENSION;
  const homeworldPers =
    !checkbox && home ? (home as IHomeworld).name : homeworld;

  return (
    <>
      {isPopup ? (
        <Popup isPopup={closePopup} personID={personID} personName={name} />
      ) : null}
      <li
        className={styles.person_item}
        key={name}
        onClick={handleClick}
        role="presentation"
      >
        <img className={styles.person_foto} src={imgUrl} alt={name} />
        <div>
          <h3>{name}</h3>
          <h4>Date of birth: {birth_year}</h4>
          {!isFetching ? (
            <h4>
              Homeworld:{' '}
              {error ? (
                <span className={styles.error}>{error}</span>
              ) : (
                homeworldPers
              )}
            </h4>
          ) : (
            <h4>Loading...</h4>
          )}
          <h4>Gender: {gender}</h4>
        </div>
      </li>
    </>
  );
}

export default Card;
