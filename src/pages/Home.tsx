import { Component } from 'react';
import PeopleList from '../components/personList/PersonList';
import Search from '../components/search/Search';

class Home extends Component {
  render() {
    return (
      <>
        <Search />
        <PeopleList />;
      </>
    );
  }
}
export default Home;
