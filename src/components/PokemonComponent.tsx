import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
// components and interfaces
import { ErrorBoundary } from './ErrorComponent';
import LoaderSpinner from './LoaderSpinner';
import { Api } from '../api/Api';
import SearchComponent from './SearchComponent';
import { IPokemonList } from '../interfaces/IPokemonList';
import PokemonList from './PokemonList';
import PaginationComponent from './PaginationComponent';

export default function PokemonComponent() {
  const api = new Api();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>(
    localStorage.getItem('searchData') || ''
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<IPokemonList[]>([]);
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [limit, setLimit] = useState<number>(
    Number(searchParams.get('limit')) || 10
  );

  const handleSubmit = async (data: string, page: number, limit: number) => {
    setLoading(true);
    setSearchParams({ page: `${page}`, limit: `${limit}` });

    const offset = (page - 1) * limit;
    const response = await api.getPokemonData(data, offset, limit);

    setResults(response);
    setPage(page);
    setLimit(limit);

    setLoading(false);
  };

  useEffect(() => {
    handleSubmit(searchData, page, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const changeLimit = (newLimit: number) => {
    setPage(1);
    setLimit(newLimit);
    setSearchParams({ page: `${page}`, limit: `${newLimit}` });
  };

  const handlePokeClick = (name: string) => {
    const updatedUrl = `/details/${name}?&page=${page}&limit=${limit}`;
    navigate(updatedUrl);
  };

  return (
    <>
      <ErrorBoundary>
        <nav>
          <NavLink to="/">Main</NavLink>
        </nav>

        <SearchComponent
          onSubmit={(data) => handleSubmit(data, 1, limit)}
          searchData={searchData}
          setSearchData={setSearchData}
        />
        {loading && <LoaderSpinner />}
        {!loading && results.length > 0 && (
          <>
            <PokemonList list={results} onClick={handlePokeClick} />
            <PaginationComponent
              currentPage={page}
              currentLimit={limit}
              onPageChange={setPage}
            />
            <div>
              <span>Show:</span>
              <button onClick={() => changeLimit(10)}>10</button>
              <button onClick={() => changeLimit(20)}>20</button>
              <button onClick={() => changeLimit(50)}>50</button>
            </div>
          </>
        )}
      </ErrorBoundary>
    </>
  );
}
