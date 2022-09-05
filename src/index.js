import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

AOS.init()

axios.defaults.withCredentials = true
axios.defaults = {
  headers: {
    'Content-Type': 'application/json',
    // 'Accept': 'application/json',
    // 'Authorization': '12314hkjgsdkfskjdthh3478jskdjfdsdsfhjk'
  }
}
axios.defaults.headers.common['Authorization']= 'Auth Token'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

