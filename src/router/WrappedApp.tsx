import { BrowserRouter } from 'react-router-dom';
import App from '../app/App';

function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default WrappedApp;
