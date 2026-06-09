import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, VideoCallSession, VideoCallState } from '../types';

interface VideoCallContextType {
  callState: VideoCallState;
  initiateCall: (partner: User) => void;
  receiveCall: (caller: User, session: VideoCallSession) => void;
  acceptCall: () => void;
  rejectCall: () => void;
  endCall: () => void;
  toggleVideo: () => void;
  toggleAudio: () => void;
  updateCallDuration: (duration: number) => void;
}

const VideoCallContext = createContext<VideoCallContextType | undefined>(undefined);

export const VideoCallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [callState, setCallState] = useState<VideoCallState>({
    isCallActive: false,
    isVideoEnabled: true,
    isAudioEnabled: true,
    callDuration: 0,
    callPartner: null,
    session: null,
  });

  const initiateCall = useCallback((partner: User) => {
    const session: VideoCallSession = {
      id: `call_${Date.now()}`,
      initiatorId: 'current_user', // This would come from AuthContext in real implementation
      receiverId: partner.id,
      status: 'initiating',
      isVideoEnabled: true,
      isAudioEnabled: true,
    };

    setCallState((prev) => ({
      ...prev,
      callPartner: partner,
      session,
    }));
  }, []);

  const receiveCall = useCallback((caller: User, session: VideoCallSession) => {
    setCallState((prev) => ({
      ...prev,
      callPartner: caller,
      session: { ...session, status: 'ringing' },
    }));
  }, []);

  const acceptCall = useCallback(() => {
    setCallState((prev) => ({
      ...prev,
      isCallActive: true,
      session: prev.session ? { ...prev.session, status: 'active' } : null,
    }));
  }, []);

  const rejectCall = useCallback(() => {
    setCallState((prev) => ({
      ...prev,
      isCallActive: false,
      callPartner: null,
      session: null,
      callDuration: 0,
    }));
  }, []);

  const endCall = useCallback(() => {
    setCallState((prev) => ({
      ...prev,
      isCallActive: false,
      callPartner: null,
      session: prev.session ? { ...prev.session, status: 'ended' } : null,
      callDuration: 0,
    }));
  }, []);

  const toggleVideo = useCallback(() => {
    setCallState((prev) => ({
      ...prev,
      isVideoEnabled: !prev.isVideoEnabled,
      session: prev.session
        ? { ...prev.session, isVideoEnabled: !prev.isVideoEnabled }
        : null,
    }));
  }, []);

  const toggleAudio = useCallback(() => {
    setCallState((prev) => ({
      ...prev,
      isAudioEnabled: !prev.isAudioEnabled,
      session: prev.session
        ? { ...prev.session, isAudioEnabled: !prev.isAudioEnabled }
        : null,
    }));
  }, []);

  const updateCallDuration = useCallback((duration: number) => {
    setCallState((prev) => ({
      ...prev,
      callDuration: duration,
      session: prev.session ? { ...prev.session, duration } : null,
    }));
  }, []);

  const value: VideoCallContextType = {
    callState,
    initiateCall,
    receiveCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleVideo,
    toggleAudio,
    updateCallDuration,
  };

  return <VideoCallContext.Provider value={value}>{children}</VideoCallContext.Provider>;
};

export const useVideoCall = (): VideoCallContextType => {
  const context = useContext(VideoCallContext);
  if (!context) {
    throw new Error('useVideoCall must be used within VideoCallProvider');
  }
  return context;
};
