import { API_PERSON } from '../constants/api';

function getPersonID(url: string): string {
  const personID = url.replace(API_PERSON, '');
  return personID;
}

export default getPersonID;
