import React, { useEffect, useState } from 'react';
import api from '../api';

interface Health {
  status: string;
  uptime: number;
  timestamp: string;
}

const Health: React.FC = () => {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    api.get<Health>('/health')
      .then(res => setHealth(res.data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!health) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Service Health</h1>
      <p>Status: <span className={health.status === 'ok' ? 'text-green-600' : 'text-red-600'}>{health.status}</span></p>
      <p>Uptime: {Math.floor(health.uptime)}s</p>
      <p>Timestamp: {new Date(health.timestamp).toLocaleString()}</p>
    </div>
  );
};

export default Health;
