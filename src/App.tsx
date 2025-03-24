import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { BookOpen, Library, LogIn, UserPlus, LogOut } from 'lucide-react';
import { MyBooks } from './pages/MyBooks';
import { ExploreBooks } from './pages/ExploreBooks';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import TechNews from './pages/TechNews';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data._id) {
            setUser(data);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link to="/explore">
                <h1 className="text-2xl font-bold text-blue-600">Productivity</h1>
              </Link>
  
              <div className="flex gap-6">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <Library size={20} />
                  My Books
                </Link>
                <Link
                  to="/explore"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <BookOpen size={20} />
                  Explore
                </Link>
                <Link 
                  to="/tech-news" 
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <BookOpen size={20} />
                  Tech News
                </Link>


                {isAuthenticated ? (
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                    >
                      <LogIn size={20} />
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                    >
                      <UserPlus size={20} />
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<MyBooks />} />
            <Route path="/explore" element={<ExploreBooks />} />
            <Route path="/tech-news" element={<TechNews />} />
            <Route path="/login" element={<Login setAuth={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/signup" element={<Signup setAuth={setIsAuthenticated} setUser={setUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
