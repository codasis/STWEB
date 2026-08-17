import { Bell, HelpCircle, MapPin, CheckCircle } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-end pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4 text-slate-500">
          <button className="hover:text-slate-800"><Bell className="w-5 h-5" /></button>
          <button className="hover:text-slate-800"><HelpCircle className="w-5 h-5" /></button>
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Welcome back, Alex.</h2>
        <p className="text-slate-600 mt-1">Here is your academic overview for today.</p>
      </div>

      <div className="flex gap-6">
        {/* Next Class Card */}
        <div className="flex-[2] bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="font-bold text-slate-900 mb-1">Next Class</p>
              <h3 className="text-2xl font-bold text-blue-600">Advanced Algorithms (CS401)</h3>
              <p className="text-sm text-slate-600 flex items-center gap-1.5 mt-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                Room 302, Science Building
              </p>
            </div>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              In 15 mins
            </span>
          </div>

          <div className="mt-auto space-y-3">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-center gap-2 text-sm font-semibold text-slate-900">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Location Verified (Campus Net)
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition-colors">
              Mark Attendance
            </button>
          </div>
        </div>

        {/* Right Sidebar Stats */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Overall Attendance</p>
            <div className="flex justify-center items-baseline">
              <h3 className="text-5xl font-bold text-blue-600">94</h3>
              <span className="text-xl font-bold text-blue-600 ml-1">%</span>
            </div>
            <p className="text-sm font-semibold text-emerald-600 mt-2 flex items-center justify-center gap-1">
              <span className="text-lg leading-none">↗</span> On track
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Semester Summary</p>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Classes Attended</span>
              <span className="text-sm font-bold text-slate-900">112</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-slate-600">Classes Missed</span>
              <span className="text-sm font-bold text-red-600">4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Today's Schedule</h3>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">View Full Calendar</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500 font-semibold text-xs">
            <tr>
              <th className="p-4 w-32">Time</th>
              <th className="p-4">Course</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-medium text-slate-900">09:00 AM</td>
              <td className="p-4 text-slate-900 font-medium">Data Structures</td>
              <td className="p-4 text-slate-600">Room 101</td>
              <td className="p-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Present
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-medium text-slate-900">11:30 AM</td>
              <td className="p-4 text-slate-900 font-medium">Advanced Algorithms</td>
              <td className="p-4 text-slate-600">Room 302</td>
              <td className="p-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Upcoming
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-medium text-slate-900">02:00 PM</td>
              <td className="p-4 text-slate-900 font-medium">Software Engineering</td>
              <td className="p-4 text-slate-600">Lab 4</td>
              <td className="p-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Upcoming
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
