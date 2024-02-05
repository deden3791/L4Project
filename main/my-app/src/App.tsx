import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import CaptionsPage from './pages/captions';
import TextPage from './pages/text';
import UserProfile from './pages/user'

const App = () => (
  <Router>
    <Routes>
      <Route path="/L4Project" element={<HomePage />} />
      <Route path="/L4Project/captions" element={<CaptionsPage />} />
      <Route path="/L4Project/text" element={<TextPage />} />
      <Route path='/L4Project/profile' element={<UserProfile />} />
    </Routes>
  </Router>
);

export default App;