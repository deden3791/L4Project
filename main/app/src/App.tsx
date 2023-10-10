import * as React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/home';
import CaptionsPage from './pages/captions';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/captions" element={<CaptionsPage />} />
    </Routes>
  </Router>
);

export default App;