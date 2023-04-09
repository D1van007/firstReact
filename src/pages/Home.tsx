import { useState } from 'react';

import Search from '../components/search/Search';
import PersonList from '../components/personList/PersonList';

function Home() {
  const [searchText, setSearchText] = useState('');

  const inputText = (text: string) => {
    setSearchText(text);
  };

  return (
    <>
      <Search inputText={inputText} />
      <PersonList textFromSearch={searchText} />;
    </>
  );
}
export default Home;
