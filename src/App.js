// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PortfoliosPage from './pages/PortfoliosPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/portfolios" element={<PortfoliosPage />} />
          <Route path="/" element={<PortfoliosPage />} /> {/* Перенаправление с корня */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
