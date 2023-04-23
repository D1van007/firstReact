import { useEffect, useState } from 'react';
import { useMap } from 'usehooks-ts';
import { useDispatch, useSelector } from 'react-redux';
import { DEAFULT_PLANET } from '../constants/deafultForm';

import Search from '../components/search/Search';
import PersonList from '../components/personList/PersonList';
import { IFilms, IHomeworld, IPerson, ISwapi } from '../types/type';
import { API_PERSON } from '../constants/api';
import getApiResource from '../utils/network';
import Popup from '../components/popup/Popup';
import pickUpPersonID from '../utils/personID';
import { RootState } from '../store';
import {
  fetchPersonList,
  personListResult,
} from '../store/personListSlice';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [homeworldListMAP, actions] = useMap<string, IHomeworld>([
    ['Earth', DEAFULT_PLANET],
  ]);
  const [personID, setPersonID] = useState<string>('');
  const [isPopup, setIsPopup] = useState(false);
  const dispatch = useDispatch();
  const textSearch = useSelector(
    (state) => (state as RootState).search.searchText
  );
  const personListFilmState: IFilms[] = useSelector(
    (state) => (state as RootState).personList.personListFilm
  );
  const personListStore = useSelector(
    (state) => (state as RootState).form.newPersonList
  );
  const { personListAPI, error, statusPersonList } = useSelector(
    (state) => (state as RootState).personList
  );
  const personListResultStore: IPerson[] = useSelector(
    (state) => (state as RootState).personList.personListResult
  );
  const createdPerson =
    (personListStore as IPerson[]).filter((e) =>
      e.name.toLowerCase().includes(textSearch.toLowerCase())
    ) || [];

  useEffect(() => {
    if (!searchText) dispatch(fetchPersonList(API_PERSON));
  }, []);

  useEffect(() => {
    dispatch(fetchPersonList(`${API_PERSON}/?search=${textSearch}`));
  }, [searchText]);

  useEffect(() => {
    const personJoint = [...personListAPI, ...createdPerson];
    dispatch(personListResult(personJoint));
  }, [personListAPI]);

  useEffect(() => {
    personListResultStore.forEach((e) => {
      if (e.homeworld.slice(0, 5) === 'https') {
        getApiResource(e.homeworld).then((res) => {
          actions.set(e.homeworld, res as IHomeworld);
        });
      }
    });

  }, [personListResultStore]);

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
  const personPopup = personListResultStore.filter((e) =>
    e.id
      ? (e.id as string) === personID
      : (pickUpPersonID(e.url).slice(1, -1) as string) === personID
  )[0];
  const personFilmList = personListFilmState?.filter((e) =>
    personPopup?.films?.includes(e.url)
  );


const [isSSR, setIsSSR] = useState(true);

useEffect(() => {
  setIsSSR(false);
}, []);

  return (
    <>
      {!isSSR &&
        <div>
          {isPopup ? (
            <Popup
              isPopup={closePopup}
              person={personPopup}
              homeworldPerson={
                homeworldListMAP?.has(personPopup.homeworld)
                  ? (homeworldListMAP?.get(personPopup.homeworld)
                      ?.name as string)
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
          />
          <PersonList
            personList={personListResultStore}
            homeworldList={homeworldListMAP}
            isFetching={statusPersonList}
            error={error}
            onClickCard={handleClickReturnID}
          />
          ;
        </div>
      }
    </>
  );
}
export default Home;
