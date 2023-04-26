import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from './../store';
import App from "./App";

export default function mainApp() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles.css"></link>
        <title>My app</title>
      </head>
      <body>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </body>
    </html>
  );
}
