import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1 style={{ color: 'white' }}>Not Found Page</h1>
      <NavLink style={{ color: '#ffe917', textDecoration: 'none' }} to="/">
        GO HOME
      </NavLink>
    </>
  );
}
export default NotFound;
