import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Bell, Calendar, TrendingUp, AlertCircle, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { CollaborationRequest } from '../../types';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors } from '../../data/users';

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);
  const recommendedInvestors = investors.slice(0, 3);

  useEffect(() => {
    if (user) {
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);
    }
  }, [user]);

  const handleRequestStatusUpdate = (requestId: string, status: 'accepted' | 'rejected') => {
    setCollaborationRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status } : req
      )
    );
  };

  if (!user) return null;

  const pendingRequests = collaborationRequests.filter(req => req.status === 'pending');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-100">Welcome back, {user.name}</h1>
          <p className="text-slate-400">Track your startup progress, investor interest, and collaborative activity.</p>
        </div>

        <Link to="/investors">
          <Button leftIcon={<PlusCircle size={18} />}>Find Investors</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="glass-panel border border-slate-800/80">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/15 text-cyan-300">
                <Bell size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-cyan-200">Pending Requests</p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-100">{pendingRequests.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="glass-panel border border-slate-800/80">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-500/15 text-violet-300">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-violet-200">Total Connections</p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-100">
                  {collaborationRequests.filter(req => req.status === 'accepted').length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="glass-panel border border-slate-800/80">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-500/15 text-amber-300">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-200">Upcoming Meetings</p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-100">2</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="glass-panel border border-slate-800/80">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-300">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-200">Profile Views</p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-100">24</h3>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="glass-panel border border-slate-800/80">
            <CardHeader className="flex flex-col gap-4 rounded-[1.75rem] border-b border-slate-800/70 bg-slate-950/80 p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-slate-100">Collaboration Requests</h2>
                <Badge variant="warning">{pendingRequests.length} pending</Badge>
              </div>
              <p className="text-sm text-slate-400">Review investor requests quickly and prioritize the hottest opportunities.</p>
            </CardHeader>

            <CardBody className="space-y-4">
              {collaborationRequests.length > 0 ? (
                <div className="space-y-4">
                  {collaborationRequests.map(request => (
                    <CollaborationRequestCard
                      key={request.id}
                      request={request}
                      onStatusUpdate={handleRequestStatusUpdate}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.75rem] border border-slate-800/70 bg-slate-950/80 p-10 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-cyan-300">
                    <AlertCircle size={24} />
                  </div>
                  <p className="text-slate-100 font-semibold">No collaboration requests yet</p>
                  <p className="mt-2 text-sm text-slate-400">Requests from investors will appear here as soon as they express interest.</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="glass-panel border border-slate-800/80">
            <CardHeader className="flex items-center justify-between p-6 bg-slate-950/80 rounded-[1.75rem] border-b border-slate-800/70">
              <h2 className="text-lg font-semibold text-slate-100">Recommended Investors</h2>
              <Link to="/investors" className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
                View all
              </Link>
            </CardHeader>

            <CardBody className="space-y-4">
              {recommendedInvestors.map(investor => (
                <InvestorCard key={investor.id} investor={investor} showActions={false} />
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};