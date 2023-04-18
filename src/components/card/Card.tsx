import styles from './Card.module.css';
import pickUpPersonID from '../../utils/personID';
import { IMG_EXTENSION, IMG_PERSON_URL } from '../../constants/api';

interface Props {
  name: string;
  url: string;
  gender: string;
  homeworld: string;
  birth_year: string;
  checkbox: boolean;
  id: string;
  onClickCard: (id: string) => void;
}

function Card({
  name,
  url,
  gender,
  homeworld,
  birth_year,
  checkbox,
  id,
  onClickCard,
}: Props) {
  const personID = !checkbox
    ? pickUpPersonID(url).slice(1, -1)
    : (id as string);

  const handleClick = () => {
    return onClickCard(personID);
  };

  const imgUrl = checkbox
    ? (url as string)
    : IMG_PERSON_URL + pickUpPersonID(url).slice(0, -1) + IMG_EXTENSION;

  return (
    <li
      className={styles.person_item}
      key={name}
      onClick={handleClick}
      role="presentation"
    >
      <img className={styles.person_photo} src={imgUrl} alt={name} />
      <div>
        <h3>{name}</h3>

        <h4>Date of birth: {birth_year}</h4>
        <h4>Homeworld: {homeworld}</h4>
        <h4>Gender: {gender}</h4>
      </div>
    </li>
  );
}

export default Card;
