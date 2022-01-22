import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux-store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


export const rerenderEntireTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <Provider store={store} >
      <App />
      </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
  
}
window.store = store
rerenderEntireTree()
store.subscribe(rerenderEntireTree)