import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  CheckCheck, 
  Clock, 
  AlertTriangle, 
  Info, 
  MapPin, 
  Radio, 
  ArrowRight
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    unreadNotificationsCount 
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const visibleNotifications = filter === 'unread'
    ? notifications.filter(n => !n.isRead)
    : notifications;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6]">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-brand-black text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-brand-orange">
              <Bell className="w-4 h-4" />
              <span>Corridor Telemetry & Travel Advisories</span>
            </div>

            <h1 className="font-bold text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-none">
              TRANSIT ALERTS & NOTIFICATIONS
            </h1>

            <p className="text-xs text-white/70 max-w-xl">
              Real-time simulated telemetry alerts covering Bhor Ghat micro-climates, toll plaza fastag queues, 
              and dynamic bus arrival updates.
            </p>
          </div>

          {unreadNotificationsCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shrink-0"
            >
              <CheckCheck className="w-4 h-4 text-emerald-400" />
              <span>Mark All as Read</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Alerts Feed */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-6">
        
        {/* Filter Strip */}
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider border transition-colors ${
                filter === 'all'
                  ? 'bg-brand-black text-white border-brand-black'
                  : 'bg-white text-brand-muted border-brand-border hover:border-brand-black'
              }`}
            >
              All Alerts ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider border transition-colors ${
                filter === 'unread'
                  ? 'bg-brand-orange text-white border-brand-orange'
                  : 'bg-white text-brand-muted border-brand-border hover:border-brand-orange'
              }`}
            >
              Unread ({unreadNotificationsCount})
            </button>
          </div>

          <span className="text-xs text-brand-muted font-medium hidden sm:inline">
            Automated neural transit monitoring
          </span>
        </div>

        {/* Alerts List */}
        {visibleNotifications.length > 0 ? (
          <div className="space-y-4">
            {visibleNotifications.map((notif) => {
              const isAlert = notif.severity === 'alert';
              const isWarning = notif.severity === 'warning';

              return (
                <div
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`bg-white border p-6 transition-all cursor-pointer relative shadow-xs hover:shadow-sm ${
                    !notif.isRead 
                      ? 'border-brand-orange bg-brand-orange-light/20' 
                      : 'border-brand-border hover:border-brand-black'
                  }`}
                >
                  {/* Unread Accent Pill */}
                  {!notif.isRead && (
                    <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                  )}

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 flex items-center justify-center shrink-0 ${
                      isAlert 
                        ? 'bg-amber-100 text-amber-700 border border-amber-300' 
                        : isWarning 
                        ? 'bg-rose-100 text-rose-700 border border-rose-300' 
                        : 'bg-brand-warm text-brand-orange border border-brand-border'
                    }`}>
                      {isAlert ? (
                        <AlertTriangle className="w-5 h-5" />
                      ) : isWarning ? (
                        <Clock className="w-5 h-5" />
                      ) : (
                        <Info className="w-5 h-5" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className={`text-base font-bold uppercase tracking-tight ${
                          !notif.isRead ? 'text-brand-orange' : 'text-brand-black'
                        }`}>
                          {notif.title}
                        </h3>
                        <span className="text-[11px] font-mono text-brand-muted">
                          {notif.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-brand-black/80 leading-relaxed max-w-3xl">
                        {notif.message}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          {!notif.isRead ? (
                            <span className="text-[10px] font-bold uppercase text-brand-orange tracking-wider">
                              ● Unread Notification
                            </span>
                          ) : (
                            <span className="text-[10px] text-brand-muted font-medium">
                              Marked Read
                            </span>
                          )}
                        </div>

                        {notif.busId && (
                          <Link
                            to={`/track/${notif.busId}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-bold uppercase tracking-wider text-brand-orange hover:underline flex items-center gap-1 group"
                          >
                            <Radio className="w-3.5 h-3.5 animate-pulse" />
                            <span>Track Referenced Bus</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-brand-border p-12 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 bg-brand-warm border border-brand-border text-brand-muted mx-auto flex items-center justify-center">
              <CheckCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-2xl font-bold uppercase tracking-tight text-brand-black">
              All caught up!
            </h3>
            <p className="text-xs text-brand-muted max-w-md mx-auto">
              There are no unread transit alerts at this time. All corridors between Mumbai and Pune are operating normally.
            </p>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
