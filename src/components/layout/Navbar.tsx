import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, Bell, MessageCircle, User, LogOut, Building2, CircleDollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashboardRoute = user?.role === 'entrepreneur'
    ? '/dashboard/entrepreneur'
    : '/dashboard/investor';

  const profileRoute = user
    ? `/profile/${user.role}/${user.id}`
    : '/login';

  const navLinks = [
    {
      icon: user?.role === 'entrepreneur' ? <Building2 size={18} /> : <CircleDollarSign size={18} />,
      text: 'Dashboard',
      path: dashboardRoute,
    },
    {
      icon: <MessageCircle size={18} />,
      text: 'Messages',
      path: user ? '/messages' : '/login',
    },
    {
      icon: <Bell size={18} />,
      text: 'Notifications',
      path: user ? '/notifications' : '/login',
    },
    {
      icon: <User size={18} />,
      text: 'Profile',
      path: profileRoute,
    },
  ];

  return (
    <nav className="bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800 shadow-[0_10px_80px_rgba(15,23,42,0.25)] z-20 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
                <span className="text-white text-sm font-bold">BN</span>
              </div>
              <div>
                <p className="text-base font-semibold text-slate-100">Business Nexus</p>
                <p className="text-xs text-slate-500">Investor + Startup Network</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-2">
            {user ? (
              <div className="flex items-center space-x-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-300 rounded-2xl hover:text-cyan-300 hover:bg-slate-900/70 transition duration-200"
                  >
                    <span className="mr-2 text-cyan-300">{link.icon}</span>
                    {link.text}
                  </Link>
                ))}

                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="text-slate-200"
                >
                  Logout
                </Button>

                <Link to={profileRoute} className="flex items-center space-x-3 ml-2 bg-slate-900/70 px-3 py-2 rounded-2xl hover:bg-slate-900 transition">
                  <Avatar
                    src={user.avatarUrl}
                    alt={user.name}
                    size="sm"
                    status={user.isOnline ? 'online' : 'offline'}
                  />
                  <span className="text-sm font-medium text-slate-100">{user.name}</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-slate-300 hover:text-cyan-300 hover:bg-slate-900/70 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-t border-slate-800 animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 rounded-3xl bg-slate-900/80">
                  <Avatar
                    src={user.avatarUrl}
                    alt={user.name}
                    size="sm"
                    status={user.isOnline ? 'online' : 'offline'}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{user.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="flex items-center gap-3 px-3 py-3 rounded-2xl text-slate-300 hover:text-cyan-300 hover:bg-slate-900/70 transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-cyan-300">{link.icon}</span>
                      {link.text}
                    </Link>
                  ))}

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-3 py-3 rounded-2xl text-slate-300 hover:text-cyan-300 hover:bg-slate-900/70 transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" fullWidth>Log in</Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button fullWidth>Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};