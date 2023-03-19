/* eslint-disable no-console */
import { ISwapi } from '../api/type';

async function getApiPerson(url: string): Promise<ISwapi | false> {
  try {
    const response = await fetch(url);
    const data: ISwapi = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default getApiPerson;
