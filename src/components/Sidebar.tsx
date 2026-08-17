import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Settings, HelpCircle, CheckCircle, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../lib/AuthContext';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function Sidebar({ role = 'admin' }: { role?: 'admin' | 'student' }) {
  const isAdmin = role === 'admin';
  const { user, needsAuth, login, logout, isLoggingIn } = useAuth();

  return (
    <div className="w-64 bg-slate-50 border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0">
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-blue-700 tracking-tight">EduTrack Pro</h1>
        {!isAdmin && <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Student Portal</p>}
      </div>

      <div className="px-4 py-4 mb-2">
        {needsAuth ? (
          <button 
            onClick={login} 
            disabled={isLoggingIn}
            className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2 px-4 rounded shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            <span>{isLoggingIn ? 'Signing in...' : 'Sign in with Google'}</span>
          </button>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 shadow-sm">
            <img
              src={user?.photoURL || (isAdmin ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80" : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80")}
              alt="Profile"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{user?.displayName || (isAdmin ? 'Academic Admin' : 'Alex Johnson')}</p>
              <p className="text-xs text-slate-500 font-medium truncate">{user?.email || 'Fall Semester 2024'}</p>
            </div>
          </div>
        )}
      </div>

      {isAdmin && (
        <div className="px-4 mb-6">
          <button className="w-full bg-[#2B4B8C] hover:bg-blue-900 text-white flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold shadow-sm transition-colors">
            <CheckCircle className="w-4 h-4" />
            Quick Attendance
          </button>
        </div>
      )}

      <nav className="flex-1 px-4 space-y-1 mt-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>
        <NavLink
          to="/classes"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )
          }
        >
          <Users className="w-5 h-5" />
          Classes
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )
          }
        >
          <BarChart3 className="w-5 h-5" />
          Reports
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )
          }
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </nav>

      <div className="p-4 border-t border-slate-200">
        <NavLink 
          to={isAdmin ? '/student' : '/'} 
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors w-full bg-blue-50 hover:bg-blue-100 rounded-lg mb-2"
        >
          {isAdmin ? 'Switch to Student View' : 'Switch to Admin View'}
        </NavLink>
        <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors w-full">
          <HelpCircle className="w-5 h-5" />
          Support
        </button>
        {!needsAuth && (
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 mt-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
