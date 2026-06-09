# WebRTC Integration Guide

This document provides a step-by-step guide to integrate real WebRTC video calling into the Business Nexus platform.

## Current State

The video calling feature is currently implemented as a **frontend mock** with:
- ✓ Complete UI/UX
- ✓ Mock video call interface
- ✓ Video/Audio toggle controls
- ✓ Call duration tracking
- ✓ Responsive design
- ✗ Actual peer-to-peer connections
- ✗ Real camera/microphone access

## Prerequisites

- Node.js 16+
- Understanding of WebRTC concepts
- TURN server credentials (for NAT traversal)
- Signaling server (optional, for advanced features)

## Step-by-Step Integration

### Step 1: Install Dependencies

```bash
npm install simple-peer webrtc-adapter
npm install --save-dev @types/simple-peer
```

**Alternative libraries** (choose one):
- `simple-peer`: High-level WebRTC wrapper (recommended)
- `peerjs`: Higher-level abstraction
- `janus-gateway`: Full-featured server
- `mediasoup`: Production-grade media server

### Step 2: Update useWebRTC Hook

Replace mock implementations in `src/hooks/useWebRTC.ts`:

```typescript
import SimplePeer from 'simple-peer';
import 'webrtc-adapter';

// Replace initializeLocalMedia implementation:
const initializeLocalMedia = useCallback(async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720 },
      audio: true,
    });
    
    localStreamRef.current = stream;
    setLocalStream({
      videoStream: stream,
      audioStream: stream,
      error: null,
    });
  } catch (err) {
    // Handle errors...
  }
}, []);

// Replace createPeerConnection implementation:
const createPeerConnection = useCallback(async () => {
  try {
    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: config.iceServers,
    });

    // Add local stream tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, localStreamRef.current!);
      });
    }

    // Handle remote stream
    peerConnectionRef.current.ontrack = (event) => {
      remoteStreamRef.current = event.streams[0];
      setRemoteStream(event.streams[0]);
    };

    // Handle ICE candidates
    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        // Send to signaling server
        sendICECandidate(event.candidate);
      }
    };

    // Handle connection state
    peerConnectionRef.current.onconnectionstatechange = () => {
      setIsConnected(
        peerConnectionRef.current?.connectionState === 'connected'
      );
    };
  } catch (err) {
    // Handle errors...
  }
}, [config]);
```

### Step 3: Implement Signaling Server

Create a WebSocket-based signaling server to exchange SDP offers/answers:

**Backend (Node.js + Socket.io example)**:

```javascript
const io = require('socket.io')(8080, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  // Handle call initiation
  socket.on('call-user', (data) => {
    io.to(data.receiverId).emit('incoming-call', {
      senderId: socket.id,
      offer: data.offer,
    });
  });

  // Handle offer response
  socket.on('call-accepted', (data) => {
    io.to(data.callerId).emit('call-answer', {
      answer: data.answer,
    });
  });

  // Handle ICE candidates
  socket.on('ice-candidate', (data) => {
    io.to(data.to).emit('ice-candidate', {
      candidate: data.candidate,
    });
  });

  // Handle call rejection
  socket.on('call-rejected', (data) => {
    io.to(data.callerId).emit('call-rejected');
  });
});
```

**Frontend connection**:

```typescript
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

socket.on('incoming-call', async (data) => {
  // Receive remote offer
  const remoteDescription = new RTCSessionDescription(data.offer);
  await peerConnectionRef.current?.setRemoteDescription(remoteDescription);
  
  // Create and send answer
  const answer = await peerConnectionRef.current?.createAnswer();
  await peerConnectionRef.current?.setLocalDescription(answer);
  
  socket.emit('call-accepted', {
    callerId: data.senderId,
    answer: answer,
  });
});

socket.on('ice-candidate', (data) => {
  peerConnectionRef.current?.addIceCandidate(
    new RTCIceCandidate(data.candidate)
  );
});
```

### Step 4: Update VideoCallModal Component

Replace mock video areas with actual video elements:

```typescript
const VideoCallModal: React.FC<Props> = ({ callPartner, ... }) => {
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const { localStream, remoteStream } = useWebRTC();

  useEffect(() => {
    if (localVideoRef.current && localStream?.videoStream) {
      localVideoRef.current.srcObject = localStream.videoStream;
    }
  }, [localStream?.videoStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="relative aspect-video bg-black">
      {/* Remote video */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Local video (PIP) */}
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        className="absolute bottom-4 right-4 w-24 h-32 rounded-lg border-2 border-white"
      />

      {/* Controls */}
      <VideoCallControls ... />
    </div>
  );
};
```

### Step 5: Handle Permissions & Errors

Add proper permission handling:

```typescript
const requestPermissions = async () => {
  try {
    await navigator.mediaDevices.enumerateDevices();
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // Success - cleanup
    stream.getTracks().forEach(track => track.stop());
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      // User denied permission
      toast.error('Please grant camera and microphone permissions');
    } else if (error.name === 'NotFoundError') {
      // No devices found
      toast.error('No camera or microphone found');
    }
  }
};
```

### Step 6: Add TURN Server Configuration

For better NAT traversal:

```typescript
const rtcConfig: RTCConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    {
      urls: 'turn:your-turn-server.com:3478',
      username: 'username',
      credential: 'password',
    },
  ],
};
```

**TURN Server Options**:
- **Twilio**: `twilio.com/stun-turn` (recommended)
- **COTURN**: Self-hosted open-source
- **AWS**: `medialive` or custom setup

### Step 7: Testing

1. **Test local connection**:
   ```bash
   npm run dev
   # Test within same network
   ```

2. **Test remote connection**:
   - Deploy frontend
   - Set up TURN server
   - Test from different networks

3. **Network debugging**:
   - Use Chrome DevTools: chrome://webrtc-internals
   - Check ICE candidate connections
   - Monitor bandwidth usage

### Step 8: Production Considerations

1. **Quality Settings**:
   ```typescript
   const qualityPresets = {
     low: { width: 320, height: 240, frameRate: 15 },
     medium: { width: 640, height: 480, frameRate: 24 },
     high: { width: 1280, height: 720, frameRate: 30 },
     ultra: { width: 1920, height: 1080, frameRate: 60 },
   };
   ```

2. **Bandwidth Optimization**:
   ```typescript
   // Adaptive bitrate
   sender?.setParameters({
     encodings: [
       { maxBitrate: 100000 }, // 100 kbps
     ],
   });
   ```

3. **Error Recovery**:
   - Auto-reconnection on failure
   - Fallback to audio-only
   - Graceful degradation

4. **Analytics**:
   ```typescript
   const stats = await peerConnection?.getStats();
   stats?.forEach(report => {
     if (report.type === 'inbound-rtp') {
       console.log('Bitrate:', report.bytesReceived);
     }
   });
   ```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Black video | Check permissions, ensure getUserMedia succeeds |
| No audio | Verify audio track enabled, check browser permissions |
| Connection fails | Check STUN/TURN servers, firewall settings |
| High latency | Use TURN server, optimize signaling |
| Echo | Enable echo cancellation in constraints |

## Security Best Practices

1. **Encryption**: Always use HTTPS/WSS
2. **Permissions**: Request permissions explicitly
3. **Stream cleanup**: Stop tracks on disconnect
4. **User validation**: Verify callee identity
5. **Rate limiting**: Prevent call spam

## Resources

- [MDN WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [WebRTC Samples](https://webrtc.github.io/samples/)
- [Simple Peer Documentation](https://github.com/feross/simple-peer)
- [COTURN Setup](https://github.com/coturn/coturn)

## Next Steps

1. Choose WebRTC library and implement
2. Set up signaling server
3. Configure TURN server
4. Test in staging environment
5. Monitor call quality metrics
6. Iterate based on user feedback

---

**Estimated Integration Time**: 2-4 weeks
**Complexity Level**: Medium to Advanced
