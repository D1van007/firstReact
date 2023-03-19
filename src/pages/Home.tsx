import { Component } from 'react';
import mainImg from '../assets/Star_Wars_Yellow_Logo.svg.png';
import styles from './Pages.module.css';

class Home extends Component {
  render() {
    return (
      <img className={styles.main_img__big} src={mainImg} alt="STAR WARS" />
    );
  }
}
export default Home;
