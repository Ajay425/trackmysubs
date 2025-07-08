import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import './App.css';
import './index.css';
import UserProvider from './context/userContext';
import Faq from './pages/Dashboard/faq';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Show loading screen first
  if (!isLoaded) {
    return <LoadingScreen onComplete={() => setIsLoaded(true)} />;
  }

  // After loading, show the app with routing
  return (
    <UserProvider>
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" exact element = {<SignUp/>} />
        <Route path="/Home" exact element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </div>
    </UserProvider>
  );
}

export default App;
