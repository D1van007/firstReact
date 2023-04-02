export interface IPerson {
  name: string;
  height?: number;
  mass?: number;
  hairColor?: string;
  skinColor?: string;
  eyeColor?: string;
  birth_year: string;
  gender?: string;
  homeworld: string;
  films?: string[];
  species?: string[];
  vehicles?: string[];
  starships?: string[];
  created?: string;
  edited?: string;
  url: string | File;
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

export interface IForm {
  name: string;
  birth: string;
  gender: {
    male: boolean;
    female: boolean;
    other: boolean;
  };
  homeworld: string;
  foto: string;
  checkbox: boolean;
}
