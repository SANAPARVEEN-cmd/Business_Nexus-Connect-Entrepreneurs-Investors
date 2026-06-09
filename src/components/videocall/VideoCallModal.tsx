import React, { useState, useEffect } from 'react';
import { X, Phone, PhoneOff } from 'lucide-react';
import { User } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { VideoCallControls } from './VideoCallControls';

interface VideoCallModalProps {
  callPartner: User;
  isIncoming?: boolean;
  onAccept?: () => void;
  onReject: () => void;
  onClose: () => void;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  callPartner,
  isIncoming = false,
  onAccept,
  onReject,
  onClose,
}) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState<'ringing' | 'active'>('ringing');

  // Simulate call acceptance and duration tracking
  useEffect(() => {
    if (isIncoming && callStatus === 'ringing') {
      return;
    }

    if (!isIncoming || (isIncoming && callStatus === 'active')) {
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      if (!isIncoming) {
        setCallStatus('active');
      }

      return () => clearInterval(timer);
    }
  }, [callStatus, isIncoming]);

  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    }
    setCallStatus('active');
  };

  const handleEndCall = () => {
    onReject();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl bg-slate-950 rounded-2xl overflow-hidden shadow-2xl">
        {/* Video Call Container */}
        <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-black flex items-center justify-center overflow-hidden">
          {/* Remote Video Area (Mock) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Avatar
                src={callPartner.avatarUrl}
                alt={callPartner.name}
                size="lg"
                status="online"
                className="w-32 h-32"
              />
              <div className="text-center">
                <h3 className="text-white text-2xl font-semibold">{callPartner.name}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {callStatus === 'ringing' ? (
                    isIncoming ? 'Incoming call...' : 'Ringing...'
                  ) : (
                    `Call in progress - ${Math.floor(callDuration / 60)}:${(callDuration % 60).toString().padStart(2, '0')}`
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Local Video Area (Mock - Bottom Right) */}
          {callStatus === 'active' && isVideoEnabled && (
            <div className="absolute bottom-4 right-4 w-24 h-32 bg-slate-800 rounded-lg border-2 border-slate-700 overflow-hidden flex items-center justify-center">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs text-center">
                  You
                </div>
                <span className="text-xs text-gray-400">Your Camera</span>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          {/* Call Controls - Ringing State */}
          {callStatus === 'ringing' && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center justify-center space-x-6">
                {isIncoming && (
                  <Button
                    onClick={handleAccept}
                    className="rounded-full p-4 bg-green-600 hover:bg-green-700 text-white transition-all"
                    title="Accept call"
                  >
                    <Phone size={28} />
                  </Button>
                )}
                <Button
                  onClick={handleEndCall}
                  className="rounded-full p-4 bg-red-600 hover:bg-red-700 text-white transition-all"
                  title="Reject or end call"
                >
                  <PhoneOff size={28} />
                </Button>
              </div>
            </div>
          )}

          {/* Call Controls - Active Call */}
          {callStatus === 'active' && (
            <VideoCallControls
              isVideoEnabled={isVideoEnabled}
              isAudioEnabled={isAudioEnabled}
              onToggleVideo={() => setIsVideoEnabled(!isVideoEnabled)}
              onToggleAudio={() => setIsAudioEnabled(!isAudioEnabled)}
              onEndCall={handleEndCall}
              callDuration={callDuration}
            />
          )}
        </div>

        {/* Video Call Info */}
        <div className="bg-slate-900 border-t border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar
                src={callPartner.avatarUrl}
                alt={callPartner.name}
                size="sm"
              />
              <div>
                <p className="text-white text-sm font-medium">{callPartner.name}</p>
                <p className="text-gray-400 text-xs">
                  {callPartner.role === 'entrepreneur' ? 'Entrepreneur' : 'Investor'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">
                {isVideoEnabled ? '✓ Video' : '✗ Video'} | {isAudioEnabled ? '✓ Audio' : '✗ Audio'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
