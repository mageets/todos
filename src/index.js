import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const initialState = {
    todos: [
      {
        description: 'kiss Karen',
        status: '1' 
      },
      {
        description: 'Hug Monkey',
        status: '1' 
      },
    ]
  };

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
