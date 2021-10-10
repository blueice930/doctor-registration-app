import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/animate.min.css';
import './assets/scss/light-bootstrap-dashboard-react.scss';
import './assets/css/demo.css';
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
