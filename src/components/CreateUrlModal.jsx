import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const CreateUrlModal = ({ isOpen, onClose, onSuccess }) => {
  const [longUrl, setLongUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://urlshortener-backend-mruz.onrender.com/api/url', { longUrl }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('URL Shortened Successfully!');
      setLongUrl('');
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1e1b4b] border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md"
          >
        <h2 className="text-2xl font-extrabold mb-6 text-white">Create Short URL</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-200 text-sm font-semibold mb-2">Long URL</label>
            <input
              type="url"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl shadow-inner text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/very/long/path"
            />
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-gray-300 font-medium hover:bg-white/10 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/40 disabled:opacity-50 transition-all"
            >
              {loading ? 'Shortening...' : 'Shorten'}
            </button>
          </div>
          </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateUrlModal;
