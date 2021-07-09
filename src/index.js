import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore  , combineReducers} from 'redux';
import { Provider } from 'react-redux';
import allReducers from "./Stor/Reducer";
// import * as serviceWorker from "serviceWorker"/
const store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Provider store={store}>
      <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
