import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { MeetingCalendar } from '../../components/calendar/MeetingCalendar';
import meetingsStore from '../../data/meetings';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const CalendarPage: React.FC = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [title, setTitle] = useState('Quick Meeting');

  const handleAddAvailability = () => {
    if (!start || !end) return;
    meetingsStore.addAvailabilitySlot('u1', start, end);
    setStart(''); setEnd('');
    alert('Availability added (demo in-memory).');
  };

  const handleSendRequest = () => {
    meetingsStore.sendMeetingRequest(title, start || new Date().toISOString(), end || undefined, 'u1', ['u2']);
    alert('Meeting request sent (demo).');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-slate-100">Calendar & Scheduling</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <MeetingCalendar />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-100">Start (ISO)</label>
                <Input value={start} onChange={(e:any)=>setStart(e.target.value)} placeholder="2026-05-29T14:00:00" />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-100">End (ISO)</label>
                <Input value={end} onChange={(e:any)=>setEnd(e.target.value)} placeholder="2026-05-29T14:30:00" />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-100">Title</label>
                <Input value={title} onChange={(e:any)=>setTitle(e.target.value)} />
              </div>

              <div className="flex flex-col gap-2">
                <Button onClick={handleAddAvailability}>Add Availability</Button>
                <Button variant="primary" onClick={handleSendRequest}>Send Meeting Request</Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CalendarPage;
