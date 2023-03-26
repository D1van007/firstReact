import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Form from '../pages/FormPage';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

class Router extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="form" element={<Form />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
}

export default Router;
