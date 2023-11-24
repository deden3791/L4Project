import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/home';
import CaptionsPage from './pages/captions';
import TextPage from './pages/text';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/captions" element={<CaptionsPage />} />
      <Route path="/text" element={<TextPage />} />
    </Routes>
  </Router>
);

export default App;