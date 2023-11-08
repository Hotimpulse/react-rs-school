import { ChangeEvent, FormEvent } from 'react';
import MyButton from '../components/ButtonComponent';

interface ISearchComponentProps {
  onSubmit: (data: string) => void;
  searchData: string;
  setSearchData: (data: string) => void;
}

export default function SearchComponent({
  onSubmit,
  searchData,
  setSearchData,
}: ISearchComponentProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchData(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('searchData', searchData);
    onSubmit(searchData);
  };

  return (
    <>
      <form className="space-y-5 flex flex-col" onSubmit={handleSubmit}>
        <input
          className="border 1px red flex-auto mr-5 text-blue-600 w-full pl-2 rounded"
          type="text"
          name="search"
          placeholder="(i.e. Pikachu)"
          value={searchData}
          onChange={handleChange}
        />
        <MyButton label="Search" />
      </form>
    </>
  );
}
