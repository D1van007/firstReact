import { useState } from 'react';
import PeopleList from '../components/personList/PersonList';
import Search from '../components/search/Search';

function Home() {
  const [searchText, setSearchText] = useState('');

  const inputText = (text: string) => {
    setSearchText(text);
  };

  return (
    <>
      <Search inputText={inputText} />
      <PeopleList textFromSearch={searchText} />;
    </>
  );
}
export default Home;
