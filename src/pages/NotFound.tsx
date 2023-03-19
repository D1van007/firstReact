import { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <>
        <h1 style={{ color: 'white' }}>Not Found Page</h1>
        <Link style={{ color: 'yellow', textDecoration: 'none' }} to="/">
          GO HOME
        </Link>
      </>
    );
  }
}
export default NotFound;
