import styles from './Loading.module.css';
import loadingImg from './img/loadingCircul.svg';

function Loading(): JSX.Element {
  return (
    <div className={styles.loading}>
      <img src={loadingImg} alt="Loading..." />
    </div>
  );
}

export default Loading;
