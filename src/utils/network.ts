import { IHomeword, ISwapi } from '../types/type';

export async function getApiPerson(url: string): Promise<ISwapi | false> {
  try {
    const response = await fetch(url);
    const data: ISwapi = await response.json();
    return data;
  } catch (e) {
    return false;
  }
}

export async function getPlanetPerson(url: string): Promise<IHomeword | false> {
  try {
    const response = await fetch(url);
    const data: IHomeword = await response.json();
    return data;
  } catch (e) {
    return false;
  }
}
