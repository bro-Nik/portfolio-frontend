import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/landing/LandingPage';
import AuthPage from './pages/auth/AuthPage';
import AppPage from './pages/app/AppPage';
import AppLayout from './pages/app/components/Layout';
import { ROUTES } from './constants/routes';

// Компонент для защищенных маршрутов с Layout
const ProtectedLayout = ({ children }) => (
  <ProtectedRoute>
    <AppLayout>
      {children}
    </AppLayout>
  </ProtectedRoute>
);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<AuthPage type={'login'} />} />
          <Route path={ROUTES.REGISTER} element={<AuthPage type={'register'} />} />
          <Route path={ROUTES.APP} element={<ProtectedLayout><AppPage /></ProtectedLayout>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
