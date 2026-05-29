import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getConversationsForUser } from '../../data/messages';
import { ChatUserList } from '../../components/chat/ChatUserList';

export const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const conversations = getConversationsForUser(user.id);

  return (
    <div className="h-[calc(100vh-8rem)] glass-panel rounded-[2rem] border border-slate-800 overflow-hidden animate-fade-in">
      {conversations.length > 0 ? (
        <ChatUserList conversations={conversations} />
      ) : (
        <div className="h-full flex flex-col items-center justify-center p-10 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300 shadow-[0_20px_60px_rgba(34,211,238,0.12)]">
            <span className="text-3xl">💬</span>
          </div>
          <h2 className="text-2xl font-semibold text-slate-100">No messages yet</h2>
          <p className="mt-3 max-w-lg text-slate-400">
            Start connecting with entrepreneurs and investors to begin meaningful conversations and close your next deal.
          </p>
        </div>
      )}
    </div>
  );
};