/* eslint-disable import/prefer-default-export */
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import Router from './router/Router';

interface IRenderProps {
  path: string;
}

export const render = ({ path }: IRenderProps) => {
  return ReactDOMServer.renderToString(
    <StaticRouter location={path}>
      <Router />
    </StaticRouter>
  );
};
