/* eslint-disable no-nested-ternary */
import DEAFULT_FORM from '../constants/deafultForm';
import { IPerson, IForm } from '../types/type';

function createdPersonArr() {
  const createdForm = (JSON.parse(
    localStorage.getItem('form') as string
  ) as IForm)
    ? (JSON.parse(localStorage.getItem('form') as string) as IForm)
    : DEAFULT_FORM;
  const newPerson: IPerson = {
    name: createdForm.fullName,
    birth_year: createdForm.birth,
    gender: createdForm.gender,
    homeworld: createdForm.homeworld,
    url: createdForm.foto,
    checkbox: createdForm.checkbox,
    id: new Date().getTime().toString(),
  };
  const getPersonArr: IPerson[] = (JSON.parse(
    localStorage.getItem('createdPerson') as string
  ) as IPerson[])
    ? (JSON.parse(localStorage.getItem('createdPerson') as string) as IPerson[])
    : [];
  getPersonArr.push(newPerson);
  return getPersonArr;
}

export default createdPersonArr;
