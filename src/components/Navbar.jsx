import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ type: "spring", stiffness: 100 }} 
      className="bg-white shadow-md"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">URL Shortener</Link>
        <div>
          {token ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 mx-3">Dashboard</Link>
              <Link to="/urls" className="text-gray-600 hover:text-blue-600 mx-3">My URLs</Link>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-3">Logout</motion.button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 mx-3">Login</Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block ml-3">
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
