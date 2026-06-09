import React from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { Button } from '../ui/Button';

interface VideoCallControlsProps {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onEndCall: () => void;
  callDuration: number;
}

export const VideoCallControls: React.FC<VideoCallControlsProps> = ({
  isVideoEnabled,
  isAudioEnabled,
  onToggleVideo,
  onToggleAudio,
  onEndCall,
  callDuration,
}) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Call Duration */}
        <div className="text-white text-2xl font-semibold font-mono bg-black/40 px-4 py-2 rounded-full">
          {formatDuration(callDuration)}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-4">
          {/* Toggle Audio */}
          <Button
            onClick={onToggleAudio}
            className={`rounded-full p-3 transition-all ${
              isAudioEnabled
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            title={isAudioEnabled ? 'Mute microphone' : 'Unmute microphone'}
          >
            {isAudioEnabled ? (
              <Mic size={24} />
            ) : (
              <MicOff size={24} />
            )}
          </Button>

          {/* Toggle Video */}
          <Button
            onClick={onToggleVideo}
            className={`rounded-full p-3 transition-all ${
              isVideoEnabled
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
          >
            {isVideoEnabled ? (
              <Video size={24} />
            ) : (
              <VideoOff size={24} />
            )}
          </Button>

          {/* End Call */}
          <Button
            onClick={onEndCall}
            className="rounded-full p-3 bg-red-600 hover:bg-red-700 text-white transition-all"
            title="End call"
          >
            <PhoneOff size={24} />
          </Button>
        </div>

        {/* Status indicators */}
        <div className="flex space-x-4 text-sm text-gray-300">
          <span className={`flex items-center space-x-1 ${!isAudioEnabled ? 'text-red-400' : ''}`}>
            <span className={`w-2 h-2 rounded-full ${isAudioEnabled ? 'bg-green-400' : 'bg-red-400'}`} />
            <span>{isAudioEnabled ? 'Audio on' : 'Audio off'}</span>
          </span>
          <span className={`flex items-center space-x-1 ${!isVideoEnabled ? 'text-red-400' : ''}`}>
            <span className={`w-2 h-2 rounded-full ${isVideoEnabled ? 'bg-green-400' : 'bg-red-400'}`} />
            <span>{isVideoEnabled ? 'Video on' : 'Video off'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
