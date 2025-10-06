// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PortfoliosPage from './pages/PortfoliosPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthForm from './pages/AuthForm';
import MainPage from './pages/MainPage';
import { ROUTES } from './constants/routes';

// Компонент для защищенных маршрутов с Layout
const ProtectedLayout = ({ children }) => (
  <ProtectedRoute>
    <Layout>
      {children}
    </Layout>
  </ProtectedRoute>
);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<MainPage />} />
          <Route path={ROUTES.LOGIN} element={<AuthForm type={'login'} />} />
          <Route path={ROUTES.REGISTER} element={<AuthForm type={'register'} />} />
          <Route path={ROUTES.APP} element={<ProtectedLayout><PortfoliosPage /></ProtectedLayout>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
