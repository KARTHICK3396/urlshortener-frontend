import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import CreateUrlModal from '../components/CreateUrlModal';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://urlshortener-backend-mruz.onrender.com/api/url/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <div className="text-center mt-10">Loading...</div>;

  const chartData = {
    labels: Object.keys(stats.dailyCounts),
    datasets: [
      {
        label: 'URLs Created',
        data: Object.values(stats.dailyCounts),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-6 max-w-6xl mx-auto"
    >
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          Create Short URL
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <motion.div whileHover={{ y: -5 }} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total URLs</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.totalUrls}</p>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Created Today</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.urlsCreatedToday}</p>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Created This Month</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.urlsCreatedThisMonth}</p>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Clicks</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.totalClicks}</p>
        </motion.div>
      </div>

      <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-800">URLs Created This Month</h2>
        <div className="h-72">
          {Object.keys(stats.dailyCounts).length > 0 ? (
            <Bar 
              options={{ 
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#374151' } } },
                scales: {
                  x: { ticks: { color: '#4B5563' }, grid: { color: 'rgba(0,0,0,0.05)' } },
                  y: { ticks: { color: '#4B5563' }, grid: { color: 'rgba(0,0,0,0.05)' } }
                }
              }} 
              data={chartData} 
            />
          ) : (
            <p className="text-gray-500 flex items-center justify-center h-full text-lg">No URLs created this month.</p>
          )}
        </div>
      </div>

      <CreateUrlModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchStats}
      />
    </motion.div>
  );
};

export default Dashboard;
