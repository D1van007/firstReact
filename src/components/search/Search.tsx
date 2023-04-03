import { useEffect, useState } from 'react';
import styles from './Search.module.css';

function Search() {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const valueLocalStorage = localStorage.getItem('searchValue');
    if (valueLocalStorage) setText(valueLocalStorage);
  }, []);

  useEffect(() => {
    return localStorage.setItem('searchValue', text);
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    setText(input);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('searchValue', text);
  };

  return (
    <form className={styles.search_form} onSubmit={handleFormSubmit}>
      <input
        className={styles.search_form__input}
        data-testid="search-input"
        name="search"
        value={text}
        onChange={handleChange}
      />
      <button type="submit" className={styles.search_form__btn}>
        Search
      </button>
    </form>
  );
}
export default Search;
