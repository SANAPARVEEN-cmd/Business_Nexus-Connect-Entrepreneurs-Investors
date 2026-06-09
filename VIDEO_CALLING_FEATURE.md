# Video Calling Feature Documentation

## Overview
This document outlines the video calling functionality added to the Business Nexus platform. The feature enables users (entrepreneurs and investors) to initiate and manage video calls with their connections.

## Features Implemented

### 1. **Video Call UI (Frontend Mock)**
- **Technology**: React + TypeScript with WebRTC-ready structure
- **Mock Implementation**: Frontend UI simulates WebRTC functionality without actual peer-to-peer connections
- **Responsive Design**: Works on desktop and tablets with Tailwind CSS styling

### 2. **Core Components**

#### VideoCallPage (`src/pages/videocall/VideoCallPage.tsx`)
- Main page for initiating video calls
- Displays contact information and call options
- Features:
  - Start/End call buttons
  - Schedule call functionality
  - Send message alternative
  - Display of video call features/capabilities
  - Embedded VideoCallModal for active calls

#### VideoCallModal (`src/components/videocall/VideoCallModal.tsx`)
- Full-screen call interface
- Features:
  - Remote video area (with caller's avatar as mock)
  - Local video preview (bottom-right corner)
  - Call status display (ringing, active, duration)
  - Accept/Reject buttons for incoming calls
  - Integrated VideoCallControls

#### VideoCallControls (`src/components/videocall/VideoCallControls.tsx`)
- Control panel for active calls
- Features:
  - **Video Toggle**: Turn camera on/off (✓ green/✗ red indicator)
  - **Audio Toggle**: Mute/unmute microphone (✓ green/✗ red indicator)
  - **End Call**: Terminate the call
  - **Call Duration**: Display time elapsed in HH:MM:SS format
  - **Status Indicators**: Visual feedback for video/audio states

#### IncomingCallNotification (`src/components/videocall/IncomingCallNotification.tsx`)
- Toast-style notification for incoming calls
- Features:
  - Caller information (avatar, name)
  - Accept/Reject buttons
  - Ringing animation effect
  - Dismissible with close button

### 3. **Context Management**

#### VideoCallContext (`src/context/VideoCallContext.tsx`)
- Manages global video call state
- Provides hooks: `useVideoCall()`
- State includes:
  - `isCallActive`: Boolean flag for active calls
  - `isVideoEnabled`: Video camera state
  - `isAudioEnabled`: Microphone state
  - `callDuration`: Time elapsed in seconds
  - `callPartner`: User object of the call participant
  - `session`: VideoCallSession object with metadata

**Available Methods**:
- `initiateCall(partner)`: Start a new call
- `receiveCall(caller, session)`: Handle incoming calls
- `acceptCall()`: Accept incoming call
- `rejectCall()`: Reject incoming call
- `endCall()`: End active call
- `toggleVideo()`: Toggle camera on/off
- `toggleAudio()`: Toggle microphone on/off
- `updateCallDuration(duration)`: Update call timer

### 4. **Type Definitions** (`src/types/index.ts`)

```typescript
interface VideoCallSession {
  id: string;
  initiatorId: string;
  receiverId: string;
  status: 'initiating' | 'ringing' | 'active' | 'ended';
  startTime?: string;
  endTime?: string;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  duration?: number;
}

interface VideoCallState {
  isCallActive: boolean;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  callDuration: number;
  callPartner: User | null;
  session: VideoCallSession | null;
}
```

## Navigation & Integration

### 1. **Sidebar Navigation**
- Added "Video Calls" link in main navigation
- Visible for both entrepreneur and investor roles
- Icon: `<Video>` from lucide-react

### 2. **Chat Page Integration**
- Video call button in chat header
- Clicking initiates a video call with the current chat partner
- Route: `/videocall/:userId`

### 3. **Navbar Integration**
- Quick access from navigation bar (extensible for future use)

## Routes Added

```
/videocall/:userId          - Video call page for specific user
```

## Usage Flow

### Initiating a Call:
1. Navigate to Chat page or through Video Calls in sidebar
2. Select a contact to chat with
3. Click the **Video Call** button (📹 icon)
4. Redirected to `/videocall/:userId`
5. Review contact information
6. Click **"Start Video Call"** button
7. Modal opens with video call interface

### During an Active Call:
1. **Toggle Video**: Click camera icon to turn video on/off
2. **Toggle Audio**: Click microphone icon to mute/unmute
3. **End Call**: Click the red phone icon to disconnect
4. **Call Duration**: Timer updates in real-time

### Accepting/Rejecting Incoming Calls:
1. Notification appears when someone calls
2. Accept: Green phone icon
3. Reject: Red phone icon
4. Close: X button (auto-dismisses)

## Current Implementation Details

### Frontend Mock
The current implementation is a **frontend-only mock** that:
- Simulates WebRTC functionality with UI only
- Does NOT establish actual peer-to-peer connections
- Displays mock video feeds (using avatars and placeholders)
- Tracks call duration locally
- Provides full UI/UX for video calling

### Future WebRTC Integration
To implement real video calling:
1. Add WebRTC libraries (e.g., `simple-peer`, `webrtc-adapter`)
2. Implement STUN/TURN server configuration
3. Add signaling server for peer discovery
4. Integrate with backend for call management
5. Replace mock video feeds with actual `<video>` elements
6. Implement ICE candidate handling

## Styling & Design

### Theme
- **Dark Mode**: Slate and black color scheme matching app design
- **Accents**: Cyan and blue for CTAs
- **Icons**: Lucide-react icons

### Responsive
- Mobile-friendly adjustments
- Flexbox and Tailwind CSS for layout
- Modal overlays for call interface

## Features Highlighted in UI

The video call page displays 6 key features:
1. ✓ HD Video Quality
2. ✓ Crystal Clear Audio
3. ✓ Screen Sharing (mock)
4. ✓ Instant Connection
5. ✓ Record Calls (mock)
6. ✓ Secure & Private

## Testing Recommendations

1. **Test Call Initiation**: Navigate to video call page from chat
2. **Test Controls**: Toggle video/audio buttons
3. **Test Duration**: Verify timer increments correctly
4. **Test Notifications**: Check incoming call UI
5. **Test Navigation**: Ensure proper routing and component rendering
6. **Test Responsive**: Check on various screen sizes

## File Structure

```
src/
  components/
    videocall/
      VideoCallModal.tsx
      VideoCallControls.tsx
      IncomingCallNotification.tsx
  context/
    VideoCallContext.tsx
  pages/
    videocall/
      VideoCallPage.tsx
  types/
    index.ts (updated with video call types)
```

## Dependencies
- React 18.3.1
- React Router DOM 6.22.1
- Lucide React 0.344.0
- TypeScript 5.5.3
- Tailwind CSS 3.4.1

## Future Enhancements

1. **Real WebRTC Integration**
   - Peer-to-peer video/audio streaming
   - Actual camera and microphone access

2. **Advanced Features**
   - Screen sharing
   - Call recording
   - Chat during calls
   - Multiple participant support
   - Virtual backgrounds
   - Call scheduling with calendar integration

3. **Backend Integration**
   - Call history storage
   - Call analytics
   - Call quality metrics
   - Notifications via WebSocket

4. **AI Features**
   - Real-time transcription
   - Automatic meeting notes
   - AI-powered call insights

## Notes

- The current implementation uses **mock WebRTC** for demonstration
- All video feeds are simulated with avatars and placeholders
- Call duration tracking is local to the browser session
- No actual peer connections are established
- Ready for production WebRTC integration
