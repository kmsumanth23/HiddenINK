import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './index.css';
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import "bootstrap/dist/css/bootstrap.min.css";

import Proutes from "./components/routes";
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
    <Provider store={store}>
    <Proutes/>
    </Provider>
);


reportWebVitals();
