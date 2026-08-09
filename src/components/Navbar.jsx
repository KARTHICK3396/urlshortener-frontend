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
      className="bg-white/10 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-lg">URL Shortener</Link>
        <div>
          {token ? (
            <>
              <Link to="/dashboard" className="text-gray-200 hover:text-pink-400 mx-4 font-medium transition-colors">Dashboard</Link>
              <Link to="/urls" className="text-gray-200 hover:text-pink-400 mx-4 font-medium transition-colors">My URLs</Link>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLogout} className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-pink-500/30 ml-4">Logout</motion.button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-200 hover:text-pink-400 mx-4 font-medium transition-colors">Login</Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block ml-4">
                <Link to="/register" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-purple-500/40">Register</Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
