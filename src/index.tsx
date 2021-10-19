import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/animate.min.css';
import './assets/scss/light-bootstrap-dashboard-react.scss';
import './assets/css/demo.css';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './routes/AppRouter';
import { LocaleProvider } from './contexts/LocaleTempContext';

ReactDOM.render(
  <React.StrictMode>
    <LocaleProvider>
      <Router>
        <AuthProvider>
          <Suspense fallback="loading">
            <AppRouter />
          </Suspense>
        </AuthProvider>
      </Router>
    </LocaleProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
