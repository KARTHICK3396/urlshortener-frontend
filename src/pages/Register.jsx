import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await axios.post('https://urlshortener-backend-mruz.onrender.com/api/auth/register', formData);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden mt-16"
    >
      <div className="px-8 py-10">
        <h2 className="text-3xl font-extrabold text-center text-white mb-8">Register</h2>
        {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="firstName">First Name</label>
              <input className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl shadow-inner text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" id="firstName" type="text" onChange={handleChange} required />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="lastName">Last Name</label>
              <input className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl shadow-inner text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" id="lastName" type="text" onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="email">Email</label>
            <input className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl shadow-inner text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" id="email" type="email" onChange={handleChange} required />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="password">Password</label>
            <div className="relative">
              <input className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl shadow-inner text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all pr-10" id="password" type={showPassword ? "text" : "password"} onChange={handleChange} required />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-8">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg w-full transform transition hover:scale-[1.02] focus:outline-none" type="submit">
              Register
            </button>
          </div>
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors">Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
