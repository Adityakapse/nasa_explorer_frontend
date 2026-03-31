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
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 text-white px-8 py-4 flex items-center justify-between">
      <span className="text-xl font-bold text-blue-400">NASA Data Explorer</span>
      <ul className="flex gap-6">
        {navLinks.map(({ path, label }) => (
          <li key={path}>
            <Link
              to={path}
              className={`pb-1 transition-colors hover:text-blue-400 ${
                pathname === path
                  ? 'text-blue-400 font-semibold border-b-2 border-blue-400'
                  : 'text-gray-300'
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
