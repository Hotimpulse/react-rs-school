import { useEffect, useState } from 'react';
import { Api } from '../api/Api';
import MyButton from '../components/ButtonComponent';
import LoaderSpinner from '../components/LoaderSpinner';
import { IPokemon } from '../interfaces/IPokemon';
import { useNavigate, useParams } from 'react-router-dom';

export default function DetailsPage() {
  const { detailId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemonData, setPokemonData] = useState<IPokemon | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const api = new Api();
    const fetchData = async (name: string) => {
      try {
        const data = await api.getPokemonByName(name);
        setPokemonData(data);
        setLoading(false);
      } catch (error) {
        setError('Something went wrong!');
        setLoading(false);
      }
    };
    if (!detailId) {
      return;
    }
    fetchData(detailId);
  }, [detailId]);

  const closeDetailsSection = () => {
    navigate(-1);
  };

  return (
    <>
      {loading && <LoaderSpinner />}
      {!error && !loading ? (
        <div className="bg-[#40f083] md:text-3xl h-full md:p-12 max-w-md:p-4 space-y-5 font-bold rounded text-sm max-w-prose">
          {pokemonData ? (
            <div className="flex flex-col md:gap-7 max-w-md:gap-4 items-center">
              <h2 className="mt-3">Pokemon Details:</h2>
              <img
                className="md:w-48"
                src={pokemonData.img || ''}
                alt={pokemonData.name}
              />
              <p>
                Name:{' '}
                {pokemonData?.name &&
                  `${pokemonData?.name
                    ?.charAt(0)
                    .toUpperCase()}${pokemonData?.name.slice(1)}`}
              </p>
              <p>Type: {pokemonData.types?.[0]}</p>
              <p>Stats:</p>
              <ul className="mb-2">
                {pokemonData?.stats?.map?.((stat, index) => (
                  <li key={index}>{`${stat.name}: ${stat.base_stat}`}</li>
                ))}
              </ul>
              <MyButton label={'Close'} onClick={closeDetailsSection} />
            </div>
          ) : (
            <>
              {error ? (
                <div className="text-red-500 p-2">
                  {error === 'Not Found' ? (
                    <div>
                      <p>This is not the right Pokemon name</p>
                      <MyButton
                        label={'Go back'}
                        onClick={closeDetailsSection}
                      />
                    </div>
                  ) : (
                    <>
                      <h2>Something went wrong</h2>
                      {error && <p>{error.toString()}</p>}
                      <MyButton
                        label={'Go back'}
                        onClick={closeDetailsSection}
                      />
                    </>
                  )}
                </div>
              ) : null}
            </>
          )}
        </div>
      ) : null}
    </>
  );
}
