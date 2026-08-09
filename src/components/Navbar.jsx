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
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">URL Shortener</Link>
        <div>
          {token ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 mx-4 font-medium transition-colors">Dashboard</Link>
              <Link to="/urls" className="text-gray-600 hover:text-blue-600 mx-4 font-medium transition-colors">My URLs</Link>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.05 }} onClick={handleLogout} className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold ml-4 transition-colors shadow-sm">Logout</motion.button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 mx-4 font-medium transition-colors">Login</Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.05 }} className="inline-block ml-4">
                <Link to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Register</Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
