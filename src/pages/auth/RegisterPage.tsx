import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CircleDollarSign, Building2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password, role);
      navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_20%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-lg shadow-cyan-500/30 mx-auto">
          <span className="text-white text-lg font-semibold">BN</span>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-slate-100 tracking-tight">Create your account</h2>
        <p className="mt-2 text-sm text-slate-400">Join Business Nexus to connect with high-growth startups and smart capital.</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-panel p-8 rounded-[2rem] border border-slate-800/80 shadow-xl shadow-cyan-500/10">
          {error && (
            <div className="mb-4 rounded-3xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-rose-100">
              <div className="flex items-start gap-2">
                <AlertCircle size={18} className="mt-0.5 text-rose-300" />
                <span>{error}</span>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">I am registering as a</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`rounded-3xl border px-4 py-3 text-sm font-medium transition ${
                    role === 'entrepreneur'
                      ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200'
                      : 'border-slate-700 bg-slate-900/90 text-slate-300 hover:border-slate-500 hover:bg-slate-900'
                  }`}
                  onClick={() => setRole('entrepreneur')}
                >
                  <Building2 size={18} className="inline-block mr-2" />
                  Entrepreneur
                </button>

                <button
                  type="button"
                  className={`rounded-3xl border px-4 py-3 text-sm font-medium transition ${
                    role === 'investor'
                      ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200'
                      : 'border-slate-700 bg-slate-900/90 text-slate-300 hover:border-slate-500 hover:bg-slate-900'
                  }`}
                  onClick={() => setRole('investor')}
                >
                  <CircleDollarSign size={18} className="inline-block mr-2" />
                  Investor
                </button>
              </div>
            </div>

            <Input
              label="Full name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              startAdornment={<User size={18} />}
            />

            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              startAdornment={<Mail size={18} />}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              startAdornment={<Lock size={18} />}
            />

            <Input
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              startAdornment={<Lock size={18} />}
            />

            <label className="inline-flex items-center gap-2 text-sm text-slate-400">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
              />
              I agree to the{' '}
              <span className="font-medium text-cyan-300">Terms of Service</span>
              {' '}and{' '}
              <span className="font-medium text-cyan-300">Privacy Policy</span>
            </label>

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
            >
              Create account
            </Button>
          </form>

          <div className="mt-7 text-center text-sm text-slate-400">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-cyan-300 hover:text-cyan-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};