// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PortfoliosPage from './pages/PortfoliosPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthForm from './pages/AuthForm';

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
    <Router>
      <Routes>
      <Route path="/login" element={<AuthForm type={'login'} />} />
      <Route path="/register" element={<AuthForm type={'register'} />} />
        
        <Route
          path="/portfolios"
          element={
            <ProtectedLayout>
              <PortfoliosPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <PortfoliosPage />
            </ProtectedLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
