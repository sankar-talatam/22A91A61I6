import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenerForm from './components/ShortenerForm';
import StatsPage from './components/StatsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page: Form to create shortened URLs */}
        <Route path="/" element={<ShortenerForm />} />

        {/* Stats page: Fetch and display statistics */}
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
