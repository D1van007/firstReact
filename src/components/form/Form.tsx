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
    if (this.checkboxRef.current)
      (this.checkboxRef.current as HTMLInputElement).checked =
        this.form.checkbox;
  }

  componentWillUnmount() {
    this.setAllInputLocalStorage();
  }

  handlerImgChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const urlImgForm = String(fileReader.result);
        localStorage.setItem('urlImgForm', urlImgForm);
      };
    }
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
    alert('Card created and added to home page');
  };

  createPerson() {
    const createdPersonArr = getCreatedPersonArr();
    localStorage.setItem('createdPerson', JSON.stringify(createdPersonArr));
  }

  redefineRef(): IForm {
    return {
      name: this.nameRef.current?.value as string,
      birth: this.birthRef.current?.value as string,
      gender: {
        male: this.genderRefMale.current?.checked as boolean,
        female: this.genderRefFemale.current?.checked as boolean,
        other: this.genderRefOther.current?.checked as boolean,
      },
      homeworld: this.homeworldRef.current?.value as string,
      foto: localStorage.getItem('urlImgForm')
        ? (localStorage.getItem('urlImgForm') as string)
        : '',
      checkbox: this.checkboxRef.current?.checked as boolean,
    };
  }

  render() {
    return (
      <form className={styles.form_inputs} onSubmit={this.handleFormSubmit}>
        <h1 style={{ color: 'rgb(255, 233, 23)' }}>Starship pilot card</h1>
        <label htmlFor="name-input" style={{ width: '100%' }}>
          Name:
          <input
            id="name-input"
            className={`${styles.form_input__name} ${styles.form_input}`}
            data-testid="name-input"
            type="text"
            name="name"
            placeholder="Enter your name..."
            required
            ref={this.nameRef}
          />
        </label>
        <label htmlFor="birth-input" style={{ width: '100%' }}>
          Birth:
          <input
            className={`${styles.form_input__name} ${styles.form_input}`}
            data-testid="birth-input"
            placeholder="дата рождения"
            type="date"
            name="birth"
            required
            ref={this.birthRef}
          />
        </label>
        <div className={`${styles.form_input__gender}`}>
          <label htmlFor="maleId" className={styles.gender_input__content}>
            Male
            <input
              id="maleId"
              data-testid="gender-input"
              name="gender"
              type="radio"
              value="Male"
              required
              ref={this.genderRefMale}
            />
          </label>
          <label htmlFor="famaleId" className={styles.gender_input__content}>
            Famale
            <input
              id="famaleId"
              data-testid="gender-input"
              name="gender"
              type="radio"
              value="Female"
              ref={this.genderRefFemale}
            />
          </label>
          <label htmlFor="otherGender" className={styles.gender_input__content}>
            Other
            <input
              id="otherGender"
              data-testid="gender-input"
              name="gender"
              type="radio"
              value="Other"
              ref={this.genderRefOther}
            />
          </label>
        </div>
        <label htmlFor="homeworld-input" style={{ width: '100%' }}>
          Homeworld:
          <select
            className={`${styles.form_input__name} ${styles.form_input}`}
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
        </label>
        <label htmlFor="foto-input" style={{ width: '100%' }}>
          Photo:
          <input
            className={`${styles.form_input__photo} ${styles.form_input}`}
            data-testid="foto-input"
            name="foto"
            type="file"
            accept="image/*"
            required
            onChange={this.handlerImgChange}
            ref={this.fotoRef}
          />
        </label>
        <label
          htmlFor="checkboxAccept"
          className={`${styles.form_input__checkbox} ${styles.form_input}`}
        >
          Consent to the processing of personal data
          <input
            id="checkboxAccept"
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
