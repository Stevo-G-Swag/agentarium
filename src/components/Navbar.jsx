import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-3 md:p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg md:text-xl font-bold">CodeGenie</Link>
        <ul className="flex space-x-2 md:space-x-4">
          <li><Link to="/" className="text-sm md:text-base hover:text-gray-300">Home</Link></li>
          <li><Link to="/about" className="text-sm md:text-base hover:text-gray-300">About</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
