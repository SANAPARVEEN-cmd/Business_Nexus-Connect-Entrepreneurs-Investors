import React, { useEffect, useState } from 'react';
import { Phone, PhoneOff, X } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { User } from '../../types';

interface IncomingCallNotificationProps {
  caller: User;
  onAccept: () => void;
  onReject: () => void;
}

export const IncomingCallNotification: React.FC<IncomingCallNotificationProps> = ({
  caller,
  onAccept,
  onReject,
}) => {
  const [isRinging, setIsRinging] = useState(true);

  useEffect(() => {
    // Simulate ringing effect
    const interval = setInterval(() => {
      setIsRinging((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-4 z-40 animate-slide-up transition-all ${
        isRinging ? 'ring-4 ring-cyan-500/50' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Avatar
            src={caller.avatarUrl}
            alt={caller.name}
            size="md"
            status="online"
          />
          <div>
            <p className="text-white font-semibold">{caller.name}</p>
            <p className="text-slate-400 text-sm">Incoming call...</p>
          </div>
        </div>
        <button
          onClick={onReject}
          className="text-slate-400 hover:text-white transition"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex space-x-3">
        <Button
          onClick={onAccept}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center space-x-2 transition"
        >
          <Phone size={18} />
          <span>Accept</span>
        </Button>

        <Button
          onClick={onReject}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center space-x-2 transition"
        >
          <PhoneOff size={18} />
          <span>Reject</span>
        </Button>
      </div>
    </div>
  );
};
