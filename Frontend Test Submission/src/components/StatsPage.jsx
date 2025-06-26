import React, { useState } from 'react';
import axios from 'axios';

function StatsPage() {
  const [shortcode, setShortcode] = useState('');
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/shorturls/${shortcode}`);
      setStats(res.data);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>URL Stats</h2>
      <input type='text' placeholder='Enter shortcode' onChange={e => setShortcode(e.target.value)} />
      <button onClick={fetchStats}>Get Stats</button>
      {stats && (
        <div>
          <p>Original URL: {stats.url}</p>
          <p>Created At: {new Date(stats.createdAt).toLocaleString()}</p>
          <p>Expiry: {new Date(stats.expiry).toLocaleString()}</p>
          <p>Total Clicks: {stats.clicks}</p>
        </div>
      )}
    </div>
  );
}

export default StatsPage;