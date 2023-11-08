export interface IPokemon {
  name: string;
  img?: string | null;
  species: string;
  types: string[];
  stats: {
    name: string;
    base_stat: string | number;
  }[];
}
