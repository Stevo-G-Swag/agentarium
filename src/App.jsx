import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      setIsLoggedIn(JSON.parse(storedLoginStatus));
    }
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    // Here you would typically store the user data or token
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    // Here you would typically clear the user data or token
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className={darkMode ? 'dark' : ''}>
            <Routes>
              <Route path="/" element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
                <Route index element={isLoggedIn ? <Index /> : <Navigate to="/login" />} />
                <Route path="about" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
                <Route path="login" element={<Login onLogin={handleLogin} />} />
                <Route path="register" element={<Register onRegister={handleLogin} />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
