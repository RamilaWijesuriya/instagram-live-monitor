import React, { useEffect, useState } from 'react';
import api from '../api';

interface Stream {
  _id: string;
  account: string;
  igStreamId: string;
  title?: string;
  startTime: string;
  viewerCount: number;
  streamUrl: string;
  isActive: boolean;
}

const AllStreams: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Stream[]>('/streams')
      .then(res => setStreams(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading streams...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Streams</h1>
      {streams.length === 0 ? (
        <p>No streams found.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4">Account</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Started</th>
              <th className="py-2 px-4">Viewers</th>
              <th className="py-2 px-4">Active</th>
            </tr>
          </thead>
          <tbody>
            {streams.map(s => (
              <tr key={s._id} className="text-center">
                <td className="py-2 px-4">{s.account}</td>
                <td className="py-2 px-4">{s.title || '-'}</td>
                <td className="py-2 px-4">{new Date(s.startTime).toLocaleString()}</td>
                <td className="py-2 px-4">{s.viewerCount}</td>
                <td className="py-2 px-4">{s.isActive ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllStreams;
