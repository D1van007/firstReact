import { useEffect, useState } from 'react';
import styles from './Search.module.css';

interface Props {
  inputText: (element: string) => void;
}

function Search({ inputText }: Props) {
  const [text, setText] = useState<string>('');
  const [activeClose, setActiveClose] = useState(false);

  useEffect(() => {
    const valueLocalStorage = localStorage.getItem('searchValue');
    if (valueLocalStorage) setText(valueLocalStorage);
  }, []);

  useEffect(() => {
    return localStorage.setItem('searchValue', text);
  });

  const visibleClose = (inputValue: string) => {
    if (inputValue.length > 0) setActiveClose(true);
    else setActiveClose(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    setText(input);
    visibleClose(input);
  };

  const handleFormSubmit = (
    event: React.FormEvent<HTMLFormElement> | KeyboardEvent
  ) => {
    event.preventDefault();
    if ((event as KeyboardEvent).code === 'enter') inputText(text);
    else inputText(text);
  };

  const handleClearInput = () => {
    setText('');
    visibleClose('');
    inputText('');
  };

  return (
    <form className={styles.search_form} onSubmit={handleFormSubmit}>
      <div className={styles.input_container}>
        <input
          className={styles.search_form__input}
          data-testid="search-input"
          name="search"
          value={text}
          onChange={handleChange}
        />
        <div onClick={handleClearInput} role="presentation">
          <img
            className={`${styles.close_btn} ${
              activeClose ? `${styles.active}` : ''
            }`}
            src="/close.svg"
            alt="close"
          />
        </div>
      </div>
      <button type="submit" className={styles.search_form__btn}>
        Search
      </button>
    </form>
  );
}
export default Search;
