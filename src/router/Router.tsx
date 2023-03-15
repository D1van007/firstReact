import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import People from '../pages/People';
import Search from '../pages/Search';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="people" element={<People />} />
      <Route path="search" element={<Search />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
