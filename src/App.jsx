import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { toast } from "sonner";
import sharedEnv, { initEnvironment } from './environment'; // Import the shared environment

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error.status === 404) return false;
        return failureCount < 3;
      },
      onError: (error) => {
        console.error('Query error:', error);
        toast.error('An error occurred while fetching data');
      },
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error);
        toast.error('An error occurred while updating data');
      },
    },
  },
});

const App = () => {
  useEffect(() => {
    const handleGlobalError = (event) => {
      event.preventDefault();
      console.error('Unhandled error:', event.error);
      toast.error('An unexpected error occurred');
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleGlobalError);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleGlobalError);
    };
  }, []);
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

    // Initialize the environment (replace with your actual config)
    initEnvironment({ apiKey: 'your_api_key' });
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
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ErrorBoundary>
          <Toaster />
          <BrowserRouter>
            <div className={darkMode ? 'dark' : ''}>
              <Routes>
                <Route path="/" element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
                  <Route index element={isLoggedIn ? <Index /> : <Navigate to="/login" />} />
                  <Route path="about" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
                  <Route path="login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
                  <Route path="register" element={isLoggedIn ? <Navigate to="/" /> : <Register onRegister={handleLogin} />} />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
          </ErrorBoundary>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
