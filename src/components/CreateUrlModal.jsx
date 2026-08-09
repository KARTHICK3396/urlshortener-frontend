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
            className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl w-full max-w-md"
          >
        <h2 className="text-2xl font-bold mb-4 text-white">Create Short URL</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2">Long URL</label>
            <input
              type="url"
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/very/long/path"
            />
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1.05 }}
              onClick={onClose}
              className="px-4 py-2 text-gray-300 font-medium hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1.05 }}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Shortening...' : 'Shorten'}
            </motion.button>
          </div>
          </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateUrlModal;
