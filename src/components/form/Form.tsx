/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
import { Component, createRef } from 'react';
import styles from './Form.module.css';
import { IForm } from '../../types/type';
import getCreatedPersonArr from '../../utils/createdPersonArr';
import DEAFULT_FORM from '../../constants/deafultForm';

class Form extends Component {
  form!: IForm;

  private nameRef = createRef<HTMLInputElement>();

  private birthRef = createRef<HTMLInputElement>();

  private genderRefMale = createRef<HTMLInputElement>();

  private genderRefFemale = createRef<HTMLInputElement>();

  private genderRefOther = createRef<HTMLInputElement>();

  private homeworldRef = createRef<HTMLSelectElement>();

  private fotoRef = createRef<HTMLInputElement>();

  private checkboxRef = createRef<HTMLInputElement>();

  componentDidMount() {
    this.form = JSON.parse(localStorage.getItem('form') as string)
      ? JSON.parse(localStorage.getItem('form') as string)
      : DEAFULT_FORM;

    if (this.nameRef.current)
      (this.nameRef.current as HTMLInputElement).value = this.form.name;
    if (this.birthRef.current)
      (this.birthRef.current as HTMLInputElement).value = this.form.birth;
    if (this.genderRefMale.current)
      (this.genderRefMale.current as HTMLInputElement).checked =
        this.form.gender.male;
    if (this.genderRefFemale.current)
      (this.genderRefFemale.current as HTMLInputElement).checked =
        this.form.gender.female;
    if (this.genderRefOther.current)
      (this.genderRefOther.current as HTMLInputElement).checked =
        this.form.gender.other;
    if (this.homeworldRef.current)
      (this.homeworldRef.current as HTMLSelectElement).value =
        this.form.homeworld;
    if (this.fotoRef.current)
      (this.fotoRef.current as HTMLInputElement).value = '';
    if (this.checkboxRef.current)
      (this.checkboxRef.current as HTMLInputElement).checked =
        this.form.checkbox;
  }

  componentWillUnmount() {
    this.setAllInputLocalStorage();
  }

  setAllInputLocalStorage() {
    this.form = this.redefineRef();
    localStorage.setItem('form', JSON.stringify(this.form));
  }

  handleFormSubmit = (
    event: React.FormEvent<HTMLInputElement | HTMLFormElement>
  ) => {
    event.preventDefault();
    this.setAllInputLocalStorage();
    this.createPerson();
    (event.target as HTMLFormElement).reset();
    alert('Карточка создана и добавлена на главную страницу');
  };

  createPerson() {
    const createdPersonArr = getCreatedPersonArr();
    localStorage.setItem('createdPerson', JSON.stringify(createdPersonArr));
  }

  redefineRef(): IForm {
    // console.log(URL.createObjectURL(this.fotoRef.current?.files[0]));
    return {
      name: this.nameRef.current?.value as string,
      birth: this.birthRef.current?.value as string,
      gender: {
        male: this.genderRefMale.current?.checked as boolean,
        female: this.genderRefFemale.current?.checked as boolean,
        other: this.genderRefOther.current?.checked as boolean,
      },
      homeworld: this.homeworldRef.current?.value as string,
      foto:
        this.fotoRef.current !== null
          ? /* this.fotoRef.current.files[0] */ ''
          : '',
      checkbox: this.checkboxRef.current?.checked as boolean,
    };
  }

  render() {
    return (
      <form className={styles.form_inputs} onSubmit={this.handleFormSubmit}>
        <input
          className={styles.form_input__name}
          data-testid="name-input"
          type="text"
          name="name"
          required
          ref={this.nameRef}
        />
        <input
          className={styles.form_input__birth}
          data-testid="birth-input"
          placeholder="дата рождения"
          type="date"
          name="birth"
          required
          ref={this.birthRef}
        />
        <div>
          <label htmlFor="maleId">
            Male
            <input
              className={styles.form_input__gender}
              id="maleId"
              data-testid="gender-input"
              name="gender"
              type="radio"
              value="Male"
              required
              ref={this.genderRefMale}
            />
          </label>
          <label htmlFor="maleId">
            Famale
            <input
              className={styles.form_input__gender}
              id="famaleId"
              data-testid="gender-input"
              name="gender"
              type="radio"
              value="Female"
              ref={this.genderRefFemale}
            />
          </label>
          <label htmlFor="otherGender">
            Other
            <input
              className={styles.form_input__gender}
              id="otherGender"
              data-testid="gender-input"
              name="gender"
              type="radio"
              value="Other"
              ref={this.genderRefOther}
            />
          </label>
        </div>
        <select
          className={styles.form_input__homeworld}
          data-testid="homeworld-input"
          name="homeworld"
          required
          ref={this.homeworldRef}
        >
          <option value="Earth">Earth</option>
          <option value="Tatooine">Tatooine</option>
          <option value="Naboo">Naboo</option>
          <option value="Alderaan">Alderaan</option>
          <option value="Stewjon">Stewjon</option>
        </select>
        <input
          className={styles.form_input__foto}
          data-testid="foto-input"
          name="foto"
          type="file"
          accept="image/*"
          required
          ref={this.fotoRef}
        />
        <label htmlFor="checkboxAccept">
          Соглашаетесь с отправкой данных
          <input
            id="checkboxAccept"
            className={styles.form_input__checkbox}
            data-testid="checkbox-input"
            name="acceptData"
            type="checkbox"
            ref={this.checkboxRef}
            required
          />
        </label>
        <button type="submit" className={styles.form_btn}>
          Submit
        </button>
      </form>
    );
  }
}
export default Form;
