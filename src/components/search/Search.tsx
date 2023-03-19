/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';
import styles from './Search.module.css';

interface IState {
  text: string;
}

class Search extends Component<object, IState> {
  constructor(props: object) {
    super(props);
    this.state = { text: '' };
  }

  componentDidMount() {
    const valueLocalStorage = localStorage.getItem('searchValue');
    valueLocalStorage
      ? this.setState({ text: valueLocalStorage })
      : this.setState({ text: '' });
  }

  componentWillUnmount() {
    localStorage.setItem('searchValue', `${this.state.text}`);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    this.setState({ text: input });
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('searchValue', `${this.state.text}`);
  };

  render() {
    return (
      <form className={styles.search_form} onSubmit={this.handleFormSubmit}>
        <input
          className={styles.search_form__input}
          data-testid="search-input"
          name="search"
          value={this.state.text}
          onChange={this.handleChange}
        />
        <button type="button" className={styles.search_form__btn}>
          Search
        </button>
      </form>
    );
  }
}
export default Search;
