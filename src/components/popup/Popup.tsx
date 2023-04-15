import styles from './Popup.module.css';
import CardExtended from '../card/CardExtended';
import { IFilms, IPerson } from '../../types/type';

interface IProps {
  isPopup: (element: boolean) => void;
  person: IPerson;
  homeworldPerson: string;
  personFilmsList: IFilms[] | string;
}

function Popup(props: IProps): JSX.Element {
  const { isPopup, person, homeworldPerson, personFilmsList } = props as IProps;

  return (
    <>
      <div
        className={styles.backgraund}
        role="presentation"
        onClick={() => {
          isPopup(false);
        }}
      />
      <div className={styles.modal}>
        <CardExtended
          person={person}
          homeworldPerson={homeworldPerson}
          personFilmsList={personFilmsList}
        />
      </div>
    </>
  );
}

export default Popup;
