import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ActivateAccount = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const activate = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/activate/${token}`);
        setMessage(res.data.message);
      } catch (err) {
        setError(err.response?.data?.message || 'Activation failed');
      }
    };
    activate();
  }, [token]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-10 text-center px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Account Activation</h2>
      {message && <div className="text-green-600 mb-4">{message}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block mt-4">Go to Login</Link>
    </div>
  );
};

export default ActivateAccount;
