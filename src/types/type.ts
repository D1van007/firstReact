export interface IPerson {
  name: string;
  height?: number;
  mass?: number;
  hairColor?: string;
  skinColor?: string;
  eyeColor?: string;
  birth_year?: string;
  gender?: string;
  homeworld?: string;
  films?: string[];
  species?: string[];
  vehicles?: string[];
  starships?: string[];
  created?: string;
  edited?: string;
  url: string;
}
export interface ISwapi {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPerson[] | null;
}
