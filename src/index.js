import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import reducer from './store/reducers/index';
const store = createStore(reducer);

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
