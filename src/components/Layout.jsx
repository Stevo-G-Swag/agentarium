import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ isLoggedIn, onLogout, darkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
