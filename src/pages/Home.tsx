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
import { personListResults, personListFilm } from '../store/personListSlice';
import { RootState } from '../store';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [homeworldListMAP, actions] = useMap<string, IHomeworld>([
    ['Earth', DEAFULT_PLANET],
  ]);
  const [personID, setPersonID] = useState<string>('');
  const [isPopup, setIsPopup] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const textSearch = useSelector(
    (state) => (state as RootState).search.searchText
  );
  const personListState: IPerson[] = useSelector(
    (state) => (state as RootState).personList.personListResults
  );
  const personListFilmState: IFilms[] = useSelector(
    (state) => (state as RootState).personList.personListFilm
  );
  const personListStore = useSelector(
    (state) => (state as RootState).form.newPersonList
  );
  const createdPerson =
    (personListStore as IPerson[]).filter((e) =>
      e.name.toLowerCase().includes(textSearch.toLowerCase())
    ) || [];

  useEffect(() => {
    const personApi = textSearch
      ? `${API_PERSON}/?search=${textSearch}`
      : `${API_PERSON}`;
    getApiResource(personApi)
      .then((res) => {
        if (res) {
          const personsRes = (res as ISwapi).results as IPerson[];
          const personJoint = [...personsRes, ...createdPerson];
          dispatch(personListResults(personJoint));
          setError('');
        } else if (createdPerson.length) {
          dispatch(personListResults(createdPerson));
          setError('');
        } else {
          setError('Something went wrong!');
        }
      })
      .finally(() => setIsFetching(false));
  }, [searchText]);

  useEffect(() => {
    personListState.forEach((e) => {
      if (e.homeworld.slice(0, 5) === 'https') {
        getApiResource(e.homeworld)
          .then((res) => {
            actions.set(e.homeworld, res as IHomeworld);
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
        dispatch(personListFilm(filmsRes));
        setError('');
      })
      .catch(() => {
        setError('Something went wrong!');
      })
      .finally(() => setIsFetching(false));
  }, [personListState]);

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
  const clearText = (isClear: boolean) => {
    setIsFetching(isClear);
  };
  const submitText = (isSubmit: boolean) => {
    setIsFetching(isSubmit);
  };
  const personPopup = personListState.filter((e) =>
    e.id
      ? (e.id as string) === personID
      : (pickUpPersonID(e.url).slice(1, -1) as string) === personID
  )[0];
  const personFilmList = personListFilmState.filter((e) =>
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
              : (personPopup.homeworld as string) || 'Loading...'
          }
          personFilmsList={
            personFilmList.length
              ? personFilmList.sort((a, b) => a.episode_id - b.episode_id)
              : 'Loading...'
          }
        />
      ) : null}
      <Search
        inputText={inputText}
        clearText={clearText}
        submitText={submitText}
      />
      <PersonList
        personList={personListState}
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
