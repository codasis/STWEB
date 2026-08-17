import { Search, Bell, HelpCircle, Download, Plus, MapPin, MapPinOff, Map, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { exportToGoogleSheets } from '../lib/sheets';

const mockStudents = [
  { id: '2021001', name: 'John Doe', email: 'john.doe@university.edu', initials: 'JD', class: 'CS 101', status: 'Present', location: 'On Campus', locIcon: MapPin, colorClass: 'bg-emerald-100 text-emerald-700', iconColor: 'text-emerald-500' },
  { id: '2021042', name: 'Alice Smith', email: 'alice.smith@university.edu', initials: 'AS', class: 'MATH 202', status: 'Absent', location: 'Unknown', locIcon: MapPinOff, colorClass: 'bg-red-100 text-red-700', iconColor: 'text-red-400' },
  { id: '2021088', name: 'Robert Johnson', email: 'robert.j@university.edu', initials: 'RJ', class: 'CS 101', status: 'Late', location: 'Off Campus (0.5mi)', locIcon: Map, colorClass: 'bg-amber-100 text-amber-700', iconColor: 'text-amber-500' },
  { id: '2021105', name: 'Emily White', email: 'emily.w@university.edu', initials: 'EW', class: 'PHYS 301', status: 'Present', location: 'On Campus', locIcon: MapPin, colorClass: 'bg-emerald-100 text-emerald-700', iconColor: 'text-emerald-500' },
];

export default function AdminDashboard() {
  const { needsAuth, login } = useAuth();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (needsAuth) {
      alert('Please sign in with Google in the sidebar to export data.');
      return;
    }

    const confirmed = window.confirm(
      `Export today's attendance roster to a new Google Sheet? This will create a new file in your Google Drive.`
    );
    if (!confirmed) return;

    setIsExporting(true);
    try {
      const headers = ['ID Number', 'Student Name', 'Email', 'Class', 'Status', 'Location'];
      const rows = mockStudents.map(s => [
        s.id, s.name, s.email, s.class, s.status, s.location
      ]);

      const url = await exportToGoogleSheets(`Attendance Report - ${new Date().toLocaleDateString()}`, headers, rows);
      alert(`Export successful! Spreadsheet created at:\n${url}`);
      window.open(url, '_blank');
    } catch (err: any) {
      console.error(err);
      alert(`Export failed: ${err.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search students, classes..."
              className="w-full bg-white border border-slate-200 rounded-md py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <button className="hover:text-slate-800"><Bell className="w-5 h-5" /></button>
          <button className="hover:text-slate-800"><HelpCircle className="w-5 h-5" /></button>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Daily Overview</h2>
          <p className="text-slate-500 mt-1">Tuesday, October 24, 2024</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 disabled:opacity-50 transition-colors"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} 
            {isExporting ? 'Exporting...' : 'Export Report'}
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Session
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Present</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-bold text-slate-900">84%</h3>
                <span className="text-sm font-medium text-emerald-600 flex items-center">↑ 2.1%</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-3">420 / 500 Students</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full" style={{ width: '84%' }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Absent</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-bold text-slate-900">11%</h3>
                <span className="text-sm font-medium text-red-500 flex items-center">↓ 0.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-400 border border-red-100">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-3">55 / 500 Students</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full" style={{ width: '11%' }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Late</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-bold text-slate-900">5%</h3>
                <span className="text-sm font-medium text-slate-400 flex items-center">— 0.0%</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-3">25 / 500 Students</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full" style={{ width: '5%' }}></div>
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Student Roster</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Name or ID..."
                className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-md text-sm w-64"
              />
            </div>
            <select className="border border-slate-200 rounded-md px-3 py-1.5 text-sm text-slate-700 bg-white">
              <option>All Classes</option>
            </select>
            <select className="border border-slate-200 rounded-md px-3 py-1.5 text-sm text-slate-700 bg-white">
              <option>All Statuses</option>
            </select>
          </div>
        </div>
        
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-xs">
            <tr>
              <th className="p-4 w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
              <th className="p-4">Student</th>
              <th className="p-4">ID Number</th>
              <th className="p-4">Class</th>
              <th className="p-4">Status</th>
              <th className="p-4">Geolocation</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockStudents.map((student, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="p-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      {student.initials}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{student.name}</p>
                      <p className="text-slate-500 text-xs">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-600">{student.id}</td>
                <td className="p-4 text-slate-600">{student.class}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.colorClass}`}>
                    {student.status}
                  </span>
                </td>
                <td className="p-4 text-slate-600 flex items-center gap-1.5 mt-2">
                  <student.locIcon className={`w-4 h-4 ${student.iconColor}`} />
                  {student.location}
                </td>
                <td className="p-4 text-right text-slate-400">
                  <button className="hover:text-slate-700">•••</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <p>Showing 1 to 4 of 500 entries</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded bg-slate-50 text-slate-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded bg-white text-slate-700 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
