import styles from './PersonList.module.css';

import { IHomeworld, IPerson } from '../../types/type';
import Loading from '../UI/UILoading/Loading';
import Card from '../card/Card';

interface Props {
  personList: IPerson[];
  homeworldList:
    | Omit<Map<string, IHomeworld>, 'set' | 'clear' | 'delete'>
    | undefined;
  onClickCard: (id: string) => void;
  isFetching: boolean;
  error: string;
}

function PersonList({
  personList,
  homeworldList,
  isFetching,
  error,
  onClickCard,
}: Props) {
  return (
    <>
      {error && <h2 className={styles.error}>{error}</h2>}
      {isFetching ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        <ul className={styles.person_list}>
          {personList &&
            personList.map(
              (
                { name, url, birth_year, homeworld, gender, checkbox, id },
                i
              ) => (
                <Card
                  key={`${name}_${+i}`}
                  name={name}
                  url={url}
                  birth_year={birth_year}
                  id={id || ''}
                  homeworld={
                    homeworldList?.has(homeworld)
                      ? (homeworldList?.get(homeworld)?.name as string)
                      : (homeworldList?.get(name)?.name as string) ||
                        'Loading...'
                  }
                  gender={gender}
                  checkbox={checkbox || false}
                  onClickCard={onClickCard}
                />
              )
            )}
        </ul>
      )}
    </>
  );
}

export default PersonList;
