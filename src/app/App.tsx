import { Component } from 'react';
import Header from '../components/header/Header';
import Router from '../router/Router';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router />
      </div>
    );
  }
}
export default App;
