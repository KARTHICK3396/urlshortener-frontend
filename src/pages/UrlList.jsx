import { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My URLs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-sm">Long URL</th>
              <th className="py-3 px-4 text-left font-semibold text-sm">Short URL</th>
              <th className="py-3 px-4 text-left font-semibold text-sm">Clicks</th>
              <th className="py-3 px-4 text-left font-semibold text-sm">Created At</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {urls.map(url => (
              <tr key={url._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 truncate max-w-xs" title={url.longUrl}>
                  <a href={url.longUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{url.longUrl}</a>
                </td>
                <td className="py-3 px-4">
                  <a href={`https://urlshortener-backend-mruz.onrender.com/api/url/${url.shortUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {`https://urlshortener-backend-mruz.onrender.com/api/url/${url.shortUrl}`}
                  </a>
                </td>
                <td className="py-3 px-4">{url.clicks}</td>
                <td className="py-3 px-4">{new Date(url.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {urls.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center">No URLs found. Create one from the dashboard!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlList;
