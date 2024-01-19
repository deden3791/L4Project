import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import CaptionsPage from './pages/captions';
import TextPage from './pages/text';
import UserProfilePage from './pages/profile';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/captions" element={<CaptionsPage />} />
      <Route path="/text" element={<TextPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
    </Routes>
  </Router>
);

export default App;