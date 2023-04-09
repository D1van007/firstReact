export interface IPerson {
  name: string;
  height?: number;
  mass?: number;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year: string;
  gender?: string;
  homeworld: string;
  films?: string[];
  species?: string[];
  vehicles?: string[];
  starships?: string[];
  created?: string;
  edited?: string;
  url: string;
  checkbox?: boolean;
}

export interface ISwapi {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPerson[] | null;
}

export interface IHomeworld {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface IFilms {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
}

export interface IForm {
  fullName: string;
  birth: string;
  gender: string;
  homeworld: string;
  foto: string;
  checkbox: boolean;
}
