import { useEffect, useState } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Router from '../router/Router';
import styles from './App.module.css';

function App() {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);
  
  return (
    <>
      {!isSSR && (
        <div className={styles.wrapper}>
          <Header />
          <main className={styles.main}>
            <Router />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
export default App;
