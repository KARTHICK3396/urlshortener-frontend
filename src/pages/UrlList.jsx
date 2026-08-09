import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://urlshortener-backend-mruz.onrender.com/api/url', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUrls(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load URLs');
      }
    };
    fetchUrls();
  }, []);

  const handleCopy = (shortUrl) => {
    const fullUrl = `https://urlshortener-backend-mruz.onrender.com/api/url/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    alert('Copied to clipboard!');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this URL?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://urlshortener-backend-mruz.onrender.com/api/url/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUrls(urls.filter(u => u._id !== id));
      alert('URL deleted successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete URL');
    }
  };

  // Filter and Pagination Logic
  const filteredUrls = urls.filter(url => 
    url.longUrl.toLowerCase().includes(searchQuery.toLowerCase()) || 
    url.shortUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUrls.length / ITEMS_PER_PAGE);
  const paginatedUrls = filteredUrls.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset page if search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-sm mt-6 max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-white">My URLs</h2>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search URLs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent">
            <thead className="bg-gray-700/50 text-gray-300 border-b border-gray-700">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-sm">Long URL</th>
                <th className="py-3 px-4 text-left font-semibold text-sm">Short URL</th>
                <th className="py-3 px-4 text-left font-semibold text-sm">Clicks</th>
                <th className="py-3 px-4 text-left font-semibold text-sm">Created At</th>
                <th className="py-3 px-4 text-center font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {paginatedUrls.map(url => (
                <motion.tr 
                  key={url._id} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: "#374151" }} 
                  className="border-b border-gray-700 transition-colors group"
                >
                  <td className="py-3 px-4 truncate max-w-xs" title={url.longUrl}>
                    <a href={url.longUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">{url.longUrl}</a>
                  </td>
                  <td className="py-3 px-4">
                    <a href={`https://urlshortener-backend-mruz.onrender.com/api/url/${url.shortUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                      {`https://urlshortener-backend-mruz.onrender.com/api/url/${url.shortUrl}`}
                    </a>
                  </td>
                  <td className="py-3 px-4">{url.clicks}</td>
                  <td className="py-3 px-4">{new Date(url.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 flex justify-center gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleCopy(url.shortUrl)} className="text-gray-400 hover:text-white transition-colors text-sm font-semibold" title="Copy URL">
                      Copy
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(url._id)} className="text-gray-400 hover:text-red-400 transition-colors text-sm font-semibold" title="Delete URL">
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
              {paginatedUrls.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-400">
                    {searchQuery ? "No URLs match your search." : "No URLs found. Create one from the dashboard!"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-400">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredUrls.length)} of {filteredUrls.length} entries
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default UrlList;
