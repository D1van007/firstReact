import { IHomeworld, ISwapi } from '../types/type';

export async function getApiPerson(url: string): Promise<ISwapi | false> {
  try {
    const response = await fetch(url);
    const data: ISwapi = await response.json();
    return data;
  } catch (e) {
    return false;
  }
}

export async function getPlanetPerson(
  url: string
): Promise<IHomeworld | false> {
  try {
    const response = await fetch(url);
    const data: IHomeworld = await response.json();
    return data;
  } catch (e) {
    return false;
  }
}
