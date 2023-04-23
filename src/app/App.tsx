import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Router from '../router/Router';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Router />
      </main>
      <Footer />
    </div>
  );
}
export default App;
