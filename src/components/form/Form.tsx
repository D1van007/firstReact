/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-alert */
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styles from './Form.module.css';
import getCreatedPersonArr from '../../utils/createdPersonArr';
import DEAFULT_FORM from '../../constants/deafultForm';

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: DEAFULT_FORM,
  });

  const [uploadImg, setUploadImg] = useState('');

  const handlerImgChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const urlImgForm = String(fileReader.result);
        setUploadImg(urlImgForm);
      };
    }
  };

  const setAllInputLocalStorage = () => {
    const myForm = watch();
    myForm.foto = uploadImg;
    localStorage.setItem('form', JSON.stringify(myForm));
  };

  const createPerson = () => {
    const createdPersonArr = getCreatedPersonArr();
    localStorage.setItem('createdPerson', JSON.stringify(createdPersonArr));
  };

  const handleFormSubmit = () => {
    setAllInputLocalStorage();
    createPerson();
    alert('Card created and added to home page');
    reset();
  };

  return (
    <form
      className={styles.form_inputs}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h1 className={`${styles.title}`}>Starship pilot card</h1>
      <label htmlFor="name-input" style={{ width: '100%' }}>
        Name:
        <input
          {...register('fullName', {
            required: 'Please enter your name',
            minLength: {
              value: 2,
              message: 'Minimum two characters',
            },
          })}
          id="name-input"
          className={`${styles.form_input__name} ${styles.form_input}`}
          data-testid="name-input"
          placeholder="Enter your name..."
        />
        <div className={`${styles.error_title}`}>
          {errors?.fullName && <p>{errors?.fullName?.message || 'Errors!'}</p>}
        </div>
      </label>

      <label htmlFor="birth-input" style={{ width: '100%' }}>
        Birth:
        <input
          className={`${styles.form_input__name} ${styles.form_input}`}
          data-testid="birth-input"
          type="date"
          {...register('birth', {
            required: 'Please enter date of birth',
          })}
        />
        <div className={`${styles.error_title}`}>
          {errors?.birth && <p>{errors?.birth?.message || 'Errors!'}</p>}
        </div>
      </label>

      <div className={`${styles.form_input__gender}`}>
        <label htmlFor="maleId" className={styles.gender_input__content}>
          Male
          <input
            id="maleId"
            data-testid="gender-input"
            type="radio"
            value="Male"
            {...register('gender', {
              required: 'Choose the gender!',
            })}
          />
        </label>
        <label htmlFor="famaleId" className={styles.gender_input__content}>
          Famale
          <input
            id="famaleId"
            data-testid="gender-input"
            {...register('gender', {
              required: 'Choose the gender!',
            })}
            type="radio"
            value="Female"
          />
        </label>
        <label htmlFor="otherGender" className={styles.gender_input__content}>
          Other
          <input
            id="otherGender"
            data-testid="gender-input"
            {...register('gender', {
              required: 'Choose the gender!',
            })}
            type="radio"
            value="Other"
          />
        </label>
        <div className={`${styles.error_title}`}>
          {errors?.gender && <p>{errors?.gender.message || 'Errors!'}</p>}
        </div>
      </div>
      <label htmlFor="homeworld-input" style={{ width: '100%' }}>
        Homeworld:
        <select
          className={`${styles.form_input__name} ${styles.form_input}`}
          data-testid="homeworld-input"
          placeholder="Select Planet"
          {...register('homeworld', {
            required: 'Choose homeworld!',
          })}
        >
          <option value="Earth">Earth</option>
          <option value="Tatooine">Tatooine</option>
          <option value="Naboo">Naboo</option>
          <option value="Alderaan">Alderaan</option>
          <option value="Stewjon">Stewjon</option>
        </select>
        <div className={`${styles.error_title}`}>
          {errors?.homeworld && <p>{errors?.homeworld.message || 'Errors!'}</p>}
        </div>
      </label>
      <label htmlFor="foto-input" style={{ width: '100%' }}>
        Photo:
        <input
          className={`${styles.form_input__photo} ${styles.form_input}`}
          data-testid="foto-input"
          type="file"
          accept="image/*"
          {...register('foto', {
            required: 'Upload your photo!',
          })}
          onChange={handlerImgChange}
        />
        <div className={`${styles.error_title}`}>
          {errors?.foto && <p>{errors?.foto.message || 'Errors!'}</p>}
        </div>
      </label>
      <div>
        <label
          htmlFor="checkboxAccept"
          className={`${styles.form_input__checkbox} ${styles.form_input}`}
        >
          Consent to the processing of personal data
          <input
            id="checkboxAccept"
            data-testid="checkbox-input"
            {...register('checkbox', {
              required:
                'To send a form confirming the processing of personal data',
            })}
            type="checkbox"
          />
        </label>
        <div className={`${styles.error_title}`}>
          {errors?.checkbox && <p>{errors?.checkbox.message || 'Errors!'}</p>}
        </div>
      </div>
      <button type="submit" className={styles.form_btn}>
        Submit
      </button>
    </form>
  );
}
export default Form;
