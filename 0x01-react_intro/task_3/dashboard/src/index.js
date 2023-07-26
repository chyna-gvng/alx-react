import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Notifications from './Notifications';

ReactDOM.render(
  <React.StrictMode>
    <div id='root-notifications'>
      <Notifications />
    </div>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
