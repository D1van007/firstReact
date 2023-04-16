import { useEffect, useState } from 'react';
import { useMap } from 'usehooks-ts';
import { useDispatch, useSelector } from 'react-redux';
import { DEAFULT_PLANET } from '../constants/deafultForm';

import Search from '../components/search/Search';
import PersonList from '../components/personList/PersonList';
import { IFilms, IHomeworld, IPerson, ISwapi } from '../types/type';
import { API_FILMS, API_PERSON } from '../constants/api';
import getApiResource from '../utils/network';
import Popup from '../components/popup/Popup';
import pickUpPersonID from '../utils/personID';
import { searchResults } from '../store/searchSlice';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [personList, setPersonList] = useState<IPerson[]>([]);
  const [homeworldListMAP, actions] = useMap<string, IHomeworld>([
    ['Earth', DEAFULT_PLANET],
  ]);

  const [filmsList, setFilmsList] = useState<IFilms[]>([]);
  const [personID, setPersonID] = useState<string>('');

  const [isPopup, setIsPopup] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  const textSearch = useSelector((state) => state.searchText.searchText);
  const resultsSearch = useSelector(
    (state) => state.searchResults.searchResults
  );

  const dispatch = useDispatch();

  const createdPerson =
    (
      JSON.parse(localStorage.getItem('createdPerson') as string) as IPerson[]
    )?.filter((e) => e.name.toLowerCase().includes(textSearch.toLowerCase())) ||
    [];

  useEffect(() => {
    personList.forEach((e) => {
      if (e.homeworld.slice(0, 5) === 'https') {
        getApiResource(e.homeworld)
          .then((res) => {
            const set = () => actions.set(e.homeworld, res as IHomeworld);
            set();
          })
          .catch(() => {
            setError('Something went wrong!');
            setIsFetching(false);
          });
      }
    });

    getApiResource(API_FILMS)
      .then((res) => {
        const filmsRes = (res as ISwapi).results as IFilms[];
        setFilmsList(filmsRes);
        setError('');
        setIsFetching(false);
      })
      .catch(() => {
        setError('Something went wrong!');
        setIsFetching(false);
      });
  }, [personList]);

  useEffect(() => {
    const personApi = textSearch
      ? `${API_PERSON}/?search=${textSearch}`
      : `${API_PERSON}`;

    getApiResource(personApi)
      .then((res) => {
        if (res) {
          const personsRes = (res as ISwapi).results as IPerson[];
          const personJoint = [...personsRes, ...createdPerson];
          dispatch(searchResults(personJoint));
          // setPersonList(personJoint);
          setError('');
        } else if (createdPerson.length) {
          dispatch(searchResults(createdPerson));
          setPersonList(createdPerson);
          setError('');
        } else {
          setError('Something went wrong!');
        }
      })
      .finally(() => setIsFetching(false));
  }, [searchText]);

  const handleClickReturnID = (id: string) => {
    setPersonID(id);
    setIsPopup(true);
  };

  const closePopup = (bool: boolean) => {
    setIsPopup(bool);
  };

  const inputText = (text: string) => {
    setSearchText(text);
  };

  const personPopup = personList?.filter((e) =>
    e.id
      ? (e.id as string) === personID
      : (pickUpPersonID(e.url).slice(1, -1) as string) === personID
  )[0];

  const personfFilmList = filmsList.filter((e) =>
    personPopup?.films?.includes(e.url)
  );

  return (
    <>
      {isPopup ? (
        <Popup
          isPopup={closePopup}
          person={personPopup}
          homeworldPerson={
            homeworldListMAP?.has(personPopup.homeworld)
              ? (homeworldListMAP?.get(personPopup.homeworld)?.name as string)
              : (homeworldListMAP?.get(personPopup.name)?.name as string) ||
                'Loading...'
          }
          personFilmsList={
            personfFilmList.length
              ? personfFilmList.sort((a, b) => a.episode_id - b.episode_id)
              : 'Loading...'
          }
        />
      ) : null}
      <Search inputText={inputText} />
      <PersonList
        personList={resultsSearch}
        homeworldList={homeworldListMAP}
        isFetching={isFetching}
        error={error}
        onClickCard={handleClickReturnID}
      />
      ;
    </>
  );
}
export default Home;
