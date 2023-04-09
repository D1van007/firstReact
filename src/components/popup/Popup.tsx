/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/naming-convention */

import CardExtended from '../card/CardExtended';
import styles from './Popup.module.css';

interface IProps {
  isPopup: (element: boolean) => void;
  personID: string | null;
  personName: string;
}

function Popup(props: IProps): JSX.Element {
  const { isPopup, personID, personName } = props as IProps;
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
        <CardExtended personID={personID} personName={personName} />
      </div>
    </>
  );
}

export default Popup;
