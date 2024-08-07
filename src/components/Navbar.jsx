import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const Navbar = ({ isLoggedIn, onLogout, darkMode, toggleDarkMode }) => {
  return (
    <nav className="bg-gray-800 text-white p-3 md:p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg md:text-xl font-bold">CodeGenie</Link>
        <ul className="flex space-x-2 md:space-x-4 items-center">
          {isLoggedIn ? (
            <>
              <li><Link to="/" className="text-sm md:text-base hover:text-gray-300">Home</Link></li>
              <li><Link to="/about" className="text-sm md:text-base hover:text-gray-300">About</Link></li>
              <li><Button onClick={onLogout} variant="ghost" className="text-sm md:text-base hover:text-gray-300">Logout</Button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="text-sm md:text-base hover:text-gray-300">Login</Link></li>
              <li><Link to="/register" className="text-sm md:text-base hover:text-gray-300">Register</Link></li>
            </>
          )}
          <li>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
