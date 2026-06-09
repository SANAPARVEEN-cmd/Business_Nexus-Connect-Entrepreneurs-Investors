import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  Building2,
  CircleDollarSign,
  Users,
  MessageCircle,
  Bell,
  FileText,
  Settings,
  HelpCircle,
  Video,
} from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-3 px-4 rounded-2xl transition duration-200 ${
          isActive
            ? 'bg-cyan-500/15 text-cyan-200 shadow-[0_0_0_1px_rgba(56,189,248,0.18)]'
            : 'text-slate-300 hover:bg-slate-900/70 hover:text-white'
        }`
      }
    >
      <span className="mr-3 text-cyan-300">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const entrepreneurItems = [
    { to: '/dashboard/entrepreneur', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/profile/entrepreneur/' + user.id, icon: <Building2 size={20} />, text: 'My Startup' },
    { to: '/investors', icon: <CircleDollarSign size={20} />, text: 'Find Investors' },
    { to: '/messages', icon: <MessageCircle size={20} />, text: 'Messages' },
    { to: '/chat', icon: <Video size={20} />, text: 'Video Calls' },
    { to: '/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/documents', icon: <FileText size={20} />, text: 'Documents' },
  ];

  const investorItems = [
    { to: '/dashboard/investor', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/profile/investor/' + user.id, icon: <CircleDollarSign size={20} />, text: 'My Portfolio' },
    { to: '/entrepreneurs', icon: <Users size={20} />, text: 'Find Startups' },
    { to: '/messages', icon: <MessageCircle size={20} />, text: 'Messages' },
    { to: '/chat', icon: <Video size={20} />, text: 'Video Calls' },
    { to: '/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/deals', icon: <FileText size={20} />, text: 'Deals' },
  ];

  const sidebarItems = user.role === 'entrepreneur' ? entrepreneurItems : investorItems;

  const commonItems = [
    { to: '/settings', icon: <Settings size={20} />, text: 'Settings' },
    { to: '/help', icon: <HelpCircle size={20} />, text: 'Help & Support' },
  ];

  return (
    <aside className="w-72 bg-slate-950/95 border-r border-slate-800 hidden md:flex md:flex-col">
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Navigation
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} to={item.to} icon={item.icon} text={item.text} />
        ))}
      </div>

      <div className="px-4 pb-6">
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-4 shadow-[0_16px_50px_rgba(15,23,42,0.25)]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Support
          </p>
          <p className="mt-3 text-sm text-slate-300">
            Need help with your next funding round or growth strategy?
          </p>
          <a
            href="mailto:support@businessnexus.com"
            className="mt-4 block text-sm font-semibold text-cyan-300 hover:text-cyan-200"
          >
            support@businessnexus.com
          </a>
        </div>
      </div>
    </aside>
  );
};