import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId="240350616855-jdo6u9ect8c15jav4fn5f4ia747ig04k.apps.googleusercontent.com">
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
