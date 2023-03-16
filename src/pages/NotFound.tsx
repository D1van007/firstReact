import { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <>
        <h1>Not Found Page</h1>
        <Link to="/">GO HOME</Link>
      </>
    );
  }
}
export default NotFound;
