import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import './App.css';
import './index.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Show loading screen first
  if (!isLoaded) {
    return <LoadingScreen onComplete={() => setIsLoaded(true)} />;
  }

  // After loading, show the app with routing
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Future routes like dashboard, signup, etc. go here */}
        <Route path="/signUp" exact element = {<SignUp/>} />
      </Routes>
    </Router>
  );
}

export default App;
