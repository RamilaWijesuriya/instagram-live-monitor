import React, { useEffect, useState } from 'react';
import api from '../api';
import socket from '../services/socket';

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

const Home: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>([]);

  useEffect(() => {
    // Fetch initial active streams
    api.get<Stream[]>('/streams/active').then(res => {
      setStreams(res.data);
      // subscribe to each account room
      const accounts = Array.from(new Set(res.data.map(s => s.account)));
      accounts.forEach(acc => socket.emit('subscribe', acc));
    });

    // Socket event handlers
    socket.on('streamStarted', (stream: Stream) => {
      setStreams(prev => [stream, ...prev]);
      socket.emit('subscribe', stream.account);
    });
    socket.on('streamUpdated', (stream: Stream) => {
      setStreams(prev => prev.map(s => s._id === stream._id ? stream : s));
    });
    socket.on('streamEnded', (stream: Stream) => {
      setStreams(prev => prev.filter(s => s._id !== stream._id));
      socket.emit('unsubscribe', stream.account);
    });

    return () => {
      socket.off('streamStarted');
      socket.off('streamUpdated');
      socket.off('streamEnded');
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Live Streams</h1>
      {streams.length === 0 ? (
        <p>No active streams.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {streams.map(s => (
            <div key={s._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{s.account}</h2>
              <p>{s.title}</p>
              <p>Viewers: {s.viewerCount}</p>
              <a href={s.streamUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">Watch</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
