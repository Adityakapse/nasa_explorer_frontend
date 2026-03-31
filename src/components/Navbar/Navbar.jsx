import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/apod', label: 'Picture of the Day' },
  { path: '/asteroids', label: 'Asteroids' },
  { path: '/image', label: 'Nasa Images' },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between">
      <span className="text-xl font-bold text-blue-400">NASA Data Explorer</span>
      <ul className="flex gap-6">
        {navLinks.map(({ path, label }) => (
          <li key={path}>
            <Link
              to={path}
              className={`hover:text-blue-400 transition-colors ${
                pathname === path ? 'text-blue-400 font-semibold' : 'text-gray-300'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
