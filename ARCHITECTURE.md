# Video Calling Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        App (Root)                               │
│  - AuthProvider (existing)                                      │
│  - VideoCallProvider (NEW) ✨                                   │
└─────────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    ┌────────────┐  ┌────────────────┐  ┌──────────────┐
    │ Navbar     │  │ Sidebar        │  │ Pages        │
    │ (existing) │  │ (UPDATED)      │  │ (UPDATED)    │
    │            │  │ - Video Calls  │  │ - Chat       │
    │            │  │   link (NEW)   │  │   (video btn)│
    └────────────┘  └────────────────┘  └──────────────┘
                                              │
                            ┌─────────────────┘
                            │
                    ┌───────▼────────────┐
                    │ Routes             │
                    ├────────────────────┤
                    │ /chat/:userId      │
                    │ /videocall/:userId │ (NEW)
                    └───────┬────────────┘
                            │
            ┌───────────────┬┴────────────────┐
            │               │                 │
    ┌───────▼──────┐  ┌────▼──────────────┐
    │ ChatPage     │  │ VideoCallPage    │ (NEW)
    │ (UPDATED)    │  │                   │
    │ - Video btn  │  │ - Contact Info   │
    │ - Button     │  │ - Features List  │
    │   handler    │  │ - Start Call Btn │
    └───────┬──────┘  └────┬──────────────┘
            │               │
            └───────┬───────┘
                    │
            ┌───────▼──────────────────┐
            │ VideoCallModal (NEW)     │
            ├──────────────────────────┤
            │ - Remote video area      │
            │ - Local video area (PIP) │
            │ - Call status            │
            │ - Ringing/Active states  │
            │ - Embedded:              │
            │   VideoCallControls      │
            └───────┬──────────────────┘
                    │
        ┌───────────┴──────────────┬─────────────────┐
        │                          │                 │
    ┌───▼──────────┐  ┌──────────▼──┐  ┌───────────▼──┐
    │ Video Toggle │  │ Audio Toggle │  │ End Call Btn  │
    │ Button       │  │ Button       │  │               │
    └──────────────┘  └──────────────┘  └───────────────┘
                            (Controls)

    ┌──────────────────────────────────────────────────┐
    │ IncomingCallNotification (NEW)                  │
    ├──────────────────────────────────────────────────┤
    │ - Caller Avatar & Name                           │
    │ - Accept / Reject Buttons                        │
    │ - Ringing Animation                              │
    │ (Positioned: bottom-right corner)                │
    └──────────────────────────────────────────────────┘
```

## Data Flow

```
User Actions:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Chat Page
   └─> Click Video Button
       └─> navigate(/videocall/:userId)
           └─> VideoCallPage Rendered
               └─> Click "Start Video Call"
                   └─> VideoCallModal Opens
                       └─> User Controls Active
                           ├─> Toggle Video
                           ├─> Toggle Audio
                           ├─> End Call
                           └─> Call Duration Updates


2. Sidebar Navigation
   └─> Click "Video Calls"
       └─> Navigate to Chat (/chat)
           └─> Select Contact
               └─> Click Video Button (same as #1)


3. Incoming Call (Future - with WebRTC)
   └─> IncomingCallNotification Shows
       ├─> Accept
       │   └─> VideoCallModal Opens
       │       └─> Active Call State
       └─> Reject
           └─> Notification Closes
```

## State Management

```
VideoCallContext
├── callState
│   ├── isCallActive: boolean
│   ├── isVideoEnabled: boolean
│   ├── isAudioEnabled: boolean
│   ├── callDuration: number (seconds)
│   ├── callPartner: User | null
│   └── session: VideoCallSession | null
│       ├── id: string
│       ├── initiatorId: string
│       ├── receiverId: string
│       ├── status: 'initiating' | 'ringing' | 'active' | 'ended'
│       ├── startTime?: string
│       ├── endTime?: string
│       ├── isVideoEnabled: boolean
│       ├── isAudioEnabled: boolean
│       └── duration?: number
│
└── Methods
    ├── initiateCall(partner: User)
    ├── receiveCall(caller: User, session: VideoCallSession)
    ├── acceptCall()
    ├── rejectCall()
    ├── endCall()
    ├── toggleVideo()
    ├── toggleAudio()
    └── updateCallDuration(duration: number)
```

## Component Hierarchy

```
App
│
├── AuthProvider
│   └── VideoCallProvider ✨ NEW
│       └── Router
│           ├── DashboardLayout
│           │   ├── Navbar
│           │   ├── Sidebar ✨ UPDATED
│           │   │   └── Links (+ Video Calls)
│           │   └── Outlet
│           │       ├── ChatPage ✨ UPDATED
│           │       │   └── (Video button handler)
│           │       └── VideoCallPage ✨ NEW
│           │           └── VideoCallModal ✨ NEW
│           │               ├── (Remote video area)
│           │               ├── (Local video area - PIP)
│           │               └── VideoCallControls ✨ NEW
│           │                   ├── Video toggle
│           │                   ├── Audio toggle
│           │                   └── End call button
│           └── IncomingCallNotification ✨ NEW
```

## File Dependencies

```
src/App.tsx
├── imports: VideoCallProvider
└── wraps: Router

src/pages/videocall/VideoCallPage.tsx
├── imports: VideoCallModal, useVideoCall
└── displays: Contact info, call options

src/components/videocall/VideoCallModal.tsx
├── imports: VideoCallControls, Avatar, Button
└── displays: Video areas, controls

src/components/videocall/VideoCallControls.tsx
└── displays: Video toggle, audio toggle, end call, timer

src/context/VideoCallContext.tsx
└── provides: useVideoCall hook

src/hooks/useWebRTC.ts
└── ready for: Real WebRTC implementation

src/pages/chat/ChatPage.tsx
├── imports: useNavigate
└── handles: Video call button click

src/components/layout/Sidebar.tsx
├── imports: Video icon
└── displays: Video Calls link

src/types/index.ts
├── exports: VideoCallSession
└── exports: VideoCallState
```

## Integration Points

```
┌─────────────────────────────────────────┐
│ External Dependencies (Already Exists)   │
└─────────────────────────────────────────┘
         │
         ├─> React 18.3.1
         ├─> React Router 6.22.1
         ├─> TypeScript 5.5.3
         ├─> Tailwind CSS 3.4.1
         └─> Lucide React 0.344.0
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
[Icons]  [Navigation]  [Styling]
(Video,  (Routes,      (Classes,
 Phone,  Link,        Dark theme)
 etc)    useNavigate)
```

## Feature Timeline

```
Current (v1.0) - Frontend Mock
├── ✅ UI/UX Complete
├── ✅ Controls Functional
├── ✅ State Management
├── ✅ Navigation Integration
└── ✅ TypeScript Types

Future (v2.0) - Real WebRTC
├── ⏳ Install WebRTC library
├── ⏳ Set up signaling server
├── ⏳ Implement peer connections
├── ⏳ Add camera/mic access
└── ⏳ Deploy TURN servers

Advanced (v3.0)
├── 🔄 Multi-participant calls
├── 🔄 Screen sharing
├── 🔄 Call recording
├── 🔄 Virtual backgrounds
└── 🔄 AI features
```

## Performance Considerations

```
Current State:
├── Components: ~1500 lines
├── Bundle Size: +~15KB (minified)
├── Memory: <5MB (mock only)
└── CPU: Minimal (no streaming)

With Real WebRTC:
├── Components: Same
├── Libraries: +~50KB-100KB
├── Memory: 50-200MB (video streaming)
├── CPU: 10-30% (video encoding)

Optimization Tips:
├── Lazy load VideoCallPage
├── Memoize components (React.memo)
├── Use useCallback for handlers
└── Implement call history pagination
```

---

**Architecture Version**: 1.0.0
**Last Updated**: 2024
**Status**: Complete (Frontend Mock)
