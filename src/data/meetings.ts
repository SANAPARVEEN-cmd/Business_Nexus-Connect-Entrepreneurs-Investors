// Simple in-memory meetings store and helpers for demo purposes
import { v4 as uuidv4 } from 'uuid';

export type MeetingStatus = 'requested' | 'confirmed' | 'declined';

export interface Meeting {
  id: string;
  title: string;
  start: string; // ISO
  end?: string; // ISO
  attendees: string[]; // user ids
  organizerId?: string;
  status: MeetingStatus;
}

export interface AvailabilitySlot {
  id: string;
  userId: string;
  start: string;
  end: string;
}

const meetings: Meeting[] = [];
const requests: Meeting[] = [];
const availability: AvailabilitySlot[] = [];

export function getMeetings() {
  return meetings.filter(m => m.status === 'confirmed');
}

export function getRequests() {
  return requests;
}

export function getAvailabilityForUser(userId: string) {
  return availability.filter(a => a.userId === userId);
}

export function addAvailabilitySlot(userId: string, start: string, end: string) {
  const slot: AvailabilitySlot = { id: uuidv4(), userId, start, end };
  availability.push(slot);
  return slot;
}

export function sendMeetingRequest(title: string, start: string, end: string | undefined, organizerId: string, attendees: string[]) {
  const m: Meeting = { id: uuidv4(), title, start, end, attendees, organizerId, status: 'requested' };
  requests.push(m);
  return m;
}

export function acceptRequest(requestId: string) {
  const idx = requests.findIndex(r => r.id === requestId);
  if (idx === -1) return null;
  const m = requests.splice(idx, 1)[0];
  m.status = 'confirmed';
  meetings.push(m);
  return m;
}

export function declineRequest(requestId: string) {
  const idx = requests.findIndex(r => r.id === requestId);
  if (idx === -1) return null;
  const m = requests.splice(idx, 1)[0];
  m.status = 'declined';
  return m;
}

export function confirmMeeting(meetingId: string) {
  const m = meetings.find(x => x.id === meetingId);
  if (!m) return null;
  m.status = 'confirmed';
  return m;
}

// Seed one confirmed meeting for demo
const now = new Date();
const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);
meetings.push({ id: uuidv4(), title: 'Intro with Sarah', start: now.toISOString(), end: inOneHour.toISOString(), attendees: ['u1','u2'], organizerId: 'u1', status: 'confirmed' });

export default {
  getMeetings,
  getRequests,
  addAvailabilitySlot,
  sendMeetingRequest,
  acceptRequest,
  declineRequest,
  getAvailabilityForUser,
  confirmMeeting,
};
