import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './routes/AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
