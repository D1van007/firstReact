import { IFilms, IHomeworld, IPerson, ISwapi } from '../types/type';

async function getApiResource(
  url: string
): Promise<ISwapi | IPerson | IHomeworld[] | IHomeworld | IFilms[] | false> {
  try {
    const response = await fetch(url);
    const data: ISwapi = await response.json();
    return data;
  } catch (e) {
    return false;
  }
}
export async function makeRequest(
  url: string[]
): Promise<IFilms[] | IHomeworld[] | false> {
  try {
    const response = await Promise.all(
      url.map(async (res) => {
        const e = await fetch(res);
        return e.json();
      })
    );
    return response;
  } catch (e) {
    return false;
  }
}

export default getApiResource;
