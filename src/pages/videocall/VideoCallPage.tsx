import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, Video, Calendar, MessageCircle } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { VideoCallModal } from '../../components/videocall/VideoCallModal';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types';
import { findUserById } from '../../data/users';

export const VideoCallPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false);

  const callPartner = userId ? findUserById(userId) : null;

  if (!currentUser || !callPartner) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <p className="text-gray-500 text-lg">User not found</p>
          <Button
            onClick={() => navigate('/chat')}
            className="mt-4"
          >
            Back to Chat
          </Button>
        </div>
      </div>
    );
  }

  const handleStartCall = () => {
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    navigate('/chat');
  };

  const handleScheduleCall = () => {
    // TODO: Implement call scheduling
    alert(`Call with ${callPartner.name} will be scheduled`);
  };

  const handleMessage = () => {
    navigate(`/chat/${callPartner.id}`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-950 to-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Call Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/chat')}
            className="text-slate-400 hover:text-white mb-6"
          >
            ← Back to Chat
          </Button>
        </div>

        {/* Main Call Card */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Profile Section */}
          <div className="p-12 text-center border-b border-slate-800">
            <Avatar
              src={callPartner.avatarUrl}
              alt={callPartner.name}
              size="lg"
              status="online"
              className="mx-auto mb-6 w-32 h-32"
            />
            <h1 className="text-4xl font-bold text-white mb-2">{callPartner.name}</h1>
            <p className="text-slate-400 text-lg mb-2">
              {callPartner.role === 'entrepreneur' ? 'Entrepreneur' : 'Investor'}
            </p>
            {callPartner.role === 'entrepreneur' && (
              <p className="text-cyan-400 font-semibold">
                {(callPartner as any).startupName}
              </p>
            )}
          </div>

          {/* Status & Quick Info */}
          <div className="bg-slate-800/50 p-6 flex justify-around items-center">
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-green-400 mx-auto mb-2" />
              <p className="text-slate-300 text-sm">Online</p>
            </div>
            <div className="text-center">
              <p className="text-slate-300 text-sm">Ready to connect</p>
            </div>
            <div className="text-center">
              <p className="text-slate-300 text-sm">High quality video & audio</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleStartCall}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 transition-all"
            >
              <Video size={20} />
              <span>Start Video Call</span>
            </Button>

            <Button
              onClick={handleScheduleCall}
              className="border border-slate-700 text-slate-300 hover:bg-slate-800 font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 transition-all"
            >
              <Calendar size={20} />
              <span>Schedule Call</span>
            </Button>

            <Button
              onClick={handleMessage}
              className="border border-slate-700 text-slate-300 hover:bg-slate-800 font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 transition-all"
            >
              <MessageCircle size={20} />
              <span>Send Message</span>
            </Button>

            <Button
              variant="ghost"
              onClick={() => navigate('/chat')}
              className="border border-slate-700 text-slate-300 hover:bg-slate-800 font-semibold py-3 rounded-xl transition-all"
            >
              Cancel
            </Button>
          </div>

          {/* Features Section */}
          <div className="bg-slate-800/30 border-t border-slate-800 p-8">
            <h3 className="text-white font-semibold mb-4">Video Call Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-slate-300 text-sm">HD Video Quality</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-slate-300 text-sm">Crystal Clear Audio</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-slate-300 text-sm">Screen Sharing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-slate-300 text-sm">Instant Connection</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-slate-300 text-sm">Record Calls</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-slate-300 text-sm">Secure & Private</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call Modal */}
        {isCallActive && (
          <VideoCallModal
            callPartner={callPartner}
            isIncoming={false}
            onReject={handleEndCall}
            onClose={handleEndCall}
          />
        )}
      </div>
    </div>
  );
};
