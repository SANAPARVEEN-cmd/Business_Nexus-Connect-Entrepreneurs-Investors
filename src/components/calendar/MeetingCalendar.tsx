import React, { useEffect, useState } from 'react';
import meetingsStore, { Meeting } from '../../data/meetings';

export const MeetingCalendar: React.FC = () => {
  const [events, setEvents] = useState<Meeting[]>([]);
  const [fullCalendar, setFullCalendar] = useState<any>(null);

  useEffect(() => {
    setEvents(meetingsStore.getMeetings());
  }, []);

  useEffect(() => {
    // try to lazy-load FullCalendar if the app has it installed
    (async () => {
      try {
        // @ts-ignore
        const FullCalendar = await import('@fullcalendar/react');
        // @ts-ignore
        const dayGrid = await import('@fullcalendar/daygrid');
        // @ts-ignore
        const timeGrid = await import('@fullcalendar/timegrid');
        // @ts-ignore
        const interaction = await import('@fullcalendar/interaction');
        setFullCalendar({ FullCalendar: FullCalendar.default, dayGrid: dayGrid.default, timeGrid: timeGrid.default, interaction: interaction.default });
      } catch (e) {
        // FullCalendar not installed — we'll fall back to a simple list view
        setFullCalendar(null);
      }
    })();
  }, []);

  if (fullCalendar) {
    const FC = fullCalendar.FullCalendar;
    const plugins = [fullCalendar.dayGrid, fullCalendar.timeGrid, fullCalendar.interaction];
    return (
      // @ts-ignore
      <FC
        plugins={plugins}
        initialView="timeGridWeek"
        events={events.map(e => ({ id: e.id, title: e.title, start: e.start, end: e.end }))}
        height="auto"
      />
    );
  }

  // Fallback simple list view if FullCalendar not available
  return (
    <div>
      <div className="space-y-3">
        {events.length === 0 && <p className="text-slate-400">No confirmed meetings yet.</p>}
        {events.map(ev => (
          <div key={ev.id} className="p-3 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex justify-between">
              <div>
                <div className="text-sm font-medium text-slate-100">{ev.title}</div>
                <div className="text-xs text-slate-400">{new Date(ev.start).toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-400">Tip: install FullCalendar for a richer calendar UI: see README.</p>
    </div>
  );
};

export default MeetingCalendar;
