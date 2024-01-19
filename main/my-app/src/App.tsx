import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import CaptionsPage from './pages/captions';
import TextPage from './pages/text';
import UserProfilePage from './pages/profile';
import UserProfile from './pages/user'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/captions" element={<CaptionsPage />} />
      <Route path="/text" element={<TextPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path='/user' element={<UserProfile />} />
    </Routes>
  </Router>
);

export default App;