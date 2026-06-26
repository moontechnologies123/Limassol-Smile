import React, { useState, useEffect } from 'react';
import { 
  Users, CheckCircle, XCircle, AlertCircle, 
  Calendar, Clock, Search, RefreshCw, Sparkles, Filter 
} from 'lucide-react';
import { Booking } from '../types';

export default function StaffDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      } else {
        setErrorMessage("Failed to load booking records.");
      }
    } catch (err) {
      setErrorMessage("Network error connecting to healthcare system.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: Booking['status']) => {
    setActionLoadingId(id);
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state directly
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
      } else {
        console.error("Could not update patient status.");
      }
    } catch (err) {
      console.error("Network error updating clinical status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filter & Search logic
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.treatment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  // Calculate stats
  const totalInquiries = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between text-left border-b border-white/40 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Administrative Clinical Portal</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Limassol Smile Studio — Dr. Elena's Dashboard
          </h2>
          <p className="text-sm text-slate-500 font-light mt-1">
            Real-time management panel for dental inquiry logs, diagnostic requests, and patient tracking.
          </p>
        </div>

        <button
          onClick={fetchBookings}
          className="px-4 py-2 border border-white/40 rounded-xl bg-white/40 backdrop-blur-sm hover:bg-white/60 text-slate-700 text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Records</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric Card: Total */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm flex items-center space-x-4 text-left">
          <div className="p-3 bg-slate-100/50 rounded-xl text-slate-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Total Inquiries</span>
            <span className="text-2xl font-black text-slate-800 block">{totalInquiries}</span>
          </div>
        </div>

        {/* Metric Card: Pending */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm flex items-center space-x-4 text-left">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Pending Review</span>
            <span className="text-2xl font-black text-amber-600 block">{pendingCount}</span>
          </div>
        </div>

        {/* Metric Card: Confirmed */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm flex items-center space-x-4 text-left">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Confirmed Slots</span>
            <span className="text-2xl font-black text-blue-600 block">{confirmedCount}</span>
          </div>
        </div>

        {/* Metric Card: Completed */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm flex items-center space-x-4 text-left">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Completed care</span>
            <span className="text-2xl font-black text-emerald-600 block">{completedCount}</span>
          </div>
        </div>
      </div>

      {/* Control Filters and Search Row */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-sm mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient name, phone, or treatment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-white/40 focus:border-blue-500 focus:ring-1 focus:ring-blue-50 bg-white/40 backdrop-blur-sm outline-none text-sm text-slate-800 transition-all placeholder-slate-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Status:</span>
          </span>
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border capitalize ${
                statusFilter === status
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-white/40 border-white/40 text-slate-600 hover:bg-white/60'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* Bookings Display Container */}
      {isLoading ? (
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 p-20 text-center space-y-3">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
          <span className="text-sm text-slate-500 block">Synchronizing with clinical databases...</span>
        </div>
      ) : errorMessage ? (
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 p-20 text-center text-rose-600 space-y-2">
          <XCircle className="w-10 h-10 mx-auto text-rose-400" />
          <p className="font-bold">{errorMessage}</p>
          <span className="text-xs text-slate-400 block">Please restart server and try again.</span>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 p-20 text-center text-slate-500 space-y-1.5">
          <Users className="w-10 h-10 mx-auto text-slate-300" />
          <p className="font-semibold text-slate-800">No Patient Records Found</p>
          <p className="text-xs font-light text-slate-400 max-w-sm mx-auto leading-relaxed">
            There are no appointment inquiries matching your criteria or search filters at this time.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className={`bg-white/40 backdrop-blur-md rounded-2xl p-5 border shadow-sm text-left flex flex-col justify-between transition-all relative overflow-hidden ${
                booking.status === 'confirmed' ? 'border-blue-500/30 ring-1 ring-blue-500/5' :
                booking.status === 'completed' ? 'border-emerald-500/20' :
                booking.status === 'cancelled' ? 'border-rose-100' : 'border-white/40'
              }`}
            >
              {/* Top Accent Strip */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${
                booking.status === 'confirmed' ? 'bg-blue-500' :
                booking.status === 'completed' ? 'bg-emerald-500' :
                booking.status === 'cancelled' ? 'bg-rose-500' : 'bg-amber-500'
              }`} />

              <div className="space-y-4">
                {/* Header info (Name & ID) */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display font-extrabold text-slate-800 text-base leading-tight">
                      {booking.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Ref: {booking.id}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide border ${
                    booking.status === 'confirmed' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                    booking.status === 'completed' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
                    booking.status === 'cancelled' ? 'bg-rose-50 border-rose-100 text-rose-800' :
                    'bg-amber-50 border-amber-200 text-amber-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                {/* Technical treatment details */}
                <div className="p-3 bg-white/40 backdrop-blur-sm rounded-xl space-y-1 text-xs border border-white/20">
                  <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Requested Protocol</span>
                  <p className="font-semibold text-slate-800 truncate">{booking.treatment}</p>
                </div>

                {/* Preferred date and slot */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{booking.preferredDate}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{booking.preferredTime}</span>
                  </div>
                </div>

                {/* Patient contact details */}
                <div className="text-xs space-y-0.5 border-t border-white/40 pt-3">
                  <p className="text-slate-500 font-light">
                    Phone: <strong className="font-semibold text-slate-700">{booking.phone}</strong>
                  </p>
                  <p className="text-slate-500 font-light truncate">
                    Email: <strong className="font-semibold text-slate-700">{booking.email}</strong>
                  </p>
                </div>

                {/* Patient Custom notes */}
                {booking.notes && (
                  <div className="text-xs bg-white/50 p-2.5 rounded-lg border border-white/40 italic text-slate-600 text-left">
                    "{booking.notes}"
                  </div>
                )}
              </div>

              {/* Action Buttons at bottom of card */}
              <div className="pt-4 mt-4 border-t border-white/40 flex items-center justify-between gap-2 shrink-0">
                <span className="text-[10px] text-slate-400 italic">
                  Created: {new Date(booking.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center space-x-1">
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                        disabled={actionLoadingId === booking.id}
                        className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold shadow-sm cursor-pointer"
                      >
                        Confirm Slot
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                        disabled={actionLoadingId === booking.id}
                        className="p-1.5 border border-rose-200 hover:bg-rose-50 rounded-lg text-rose-500 cursor-pointer"
                        title="Cancel Booking"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {booking.status === 'confirmed' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(booking.id, 'completed')}
                        disabled={actionLoadingId === booking.id}
                        className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold shadow-sm cursor-pointer"
                      >
                        Mark Completed
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                        disabled={actionLoadingId === booking.id}
                        className="p-1.5 border border-rose-100 hover:bg-rose-50 rounded-lg text-rose-500 cursor-pointer"
                        title="Cancel"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {(booking.status === 'completed' || booking.status === 'cancelled') && (
                    <button
                      onClick={() => handleUpdateStatus(booking.id, 'pending')}
                      disabled={actionLoadingId === booking.id}
                      className="px-2.5 py-1.5 bg-white/40 backdrop-blur-sm border border-white/40 hover:bg-white/60 text-slate-700 rounded-lg text-[10px] font-semibold cursor-pointer"
                    >
                      Re-open Inquiry
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
