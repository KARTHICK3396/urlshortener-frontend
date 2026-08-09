import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const UrlList = () => {
  const [urls, setUrls] = useState([]);

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
      }
    };
    fetchUrls();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm mt-6 max-w-6xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My URLs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-sm">Long URL</th>
              <th className="py-3 px-4 text-left font-semibold text-sm">Short URL</th>
              <th className="py-3 px-4 text-left font-semibold text-sm">Clicks</th>
              <th className="py-3 px-4 text-left font-semibold text-sm">Created At</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {urls.map(url => (
              <motion.tr 
                key={url._id} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: "#f9fafb" }} 
                className="border-b border-gray-100 transition-colors"
              >
                <td className="py-3 px-4 truncate max-w-xs" title={url.longUrl}>
                  <a href={url.longUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">{url.longUrl}</a>
                </td>
                <td className="py-3 px-4">
                  <a href={`https://urlshortener-backend-mruz.onrender.com/api/url/${url.shortUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                    {`https://urlshortener-backend-mruz.onrender.com/api/url/${url.shortUrl}`}
                  </a>
                </td>
                <td className="py-3 px-4">{url.clicks}</td>
                <td className="py-3 px-4">{new Date(url.createdAt).toLocaleDateString()}</td>
              </motion.tr>
            ))}
            {urls.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center">No URLs found. Create one from the dashboard!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UrlList;
