/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component } from 'react';
import styles from './Search.module.css';

interface IState {
  text: string;
}

class Search extends Component<object, IState> {
  text!: string;

  constructor(props: object) {
    super(props);
    this.state = { text: '' };
    ({ text: this.text } = this.state);
  }

  componentDidMount() {
    const valueLocalStorage = localStorage.getItem('searchValue');
    if (valueLocalStorage) this.setState({ text: valueLocalStorage });
  }

  componentWillUnmount() {
    localStorage.setItem('searchValue', `${this.text}`);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    this.setState({ text: input });
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('searchValue', `${this.text}`);
  };

  render() {
    return (
      <form className={styles.search_form} onSubmit={this.handleFormSubmit}>
        <input
          className={styles.search_form__input}
          data-testid="search-input"
          name="search"
          value={this.text}
          onChange={this.handleChange}
        />
        <button type="submit" className={styles.search_form__btn}>
          Search
        </button>
      </form>
    );
  }
}
export default Search;
