import { Link } from 'react-router-dom';
import { IPokemonList } from '../interfaces/IPokemonList';

interface IPokemonListProps {
  list: IPokemonList[];
  onClick?: (data: string) => void;
}

export default function PokemonList({ list }: IPokemonListProps) {
  return (
    <div className="bg-[#55c6da] grid p-6 w-full rounded items-center justify-center">
      <ul className="grid md:grid-cols-7 sm:grid-cols-4 md:gap-8 sm:gap-2 items-center justify-center">
        {list.map((pokemon) => (
          <li key={pokemon.name}>
            <Link to={`/details/${pokemon.name}`}>
              <img
                className="md:w-24"
                src={pokemon.img || ''}
                alt={pokemon.name}
              />
              <span>{pokemon.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
