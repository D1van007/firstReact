import { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <>
        <h1 style={{ color: 'white' }}>Not Found Page</h1>
        <NavLink style={{ color: '#ffe917', textDecoration: 'none' }} to="/">
          GO HOME
        </NavLink>
      </>
    );
  }
}
export default NotFound;
