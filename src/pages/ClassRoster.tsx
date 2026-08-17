import { Search, Download, AlertTriangle, Users, Info, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { exportToGoogleSheets } from '../lib/sheets';

const chartData = [
  { name: 'Mon', present: 28 },
  { name: 'Tue', present: 30 },
  { name: 'Wed', present: 29 },
  { name: 'Thu', present: 28 },
  { name: 'Fri', present: 25 },
  { name: 'Mon', present: 29 },
  { name: 'Today', present: 32 },
];

const mockStudents = [
  { id: '982734', name: 'Alice Chen', status: 'present', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80' },
  { id: '982735', name: 'Marcus Johnson', status: 'absent', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80' },
  { id: '982736', name: 'Sarah Patel', status: 'late', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80' },
  { id: '982737', name: 'Student 4', status: 'present', img: null },
  { id: '982738', name: 'Student 5', status: 'present', img: null },
  { id: '982739', name: 'Student 6', status: 'present', img: null },
  { id: '982740', name: 'Student 7', status: 'present', img: null },
  { id: '982741', name: 'Student 8', status: 'present', img: null },
  { id: '982742', name: 'Student 9', status: 'present', img: null },
  { id: '982743', name: 'Student 10', status: 'present', img: null },
  { id: '982744', name: 'Student 11', status: 'present', img: null },
  { id: '982745', name: 'Student 12', status: 'present', img: null },
  { id: '982746', name: 'Student 13', status: 'present', img: null },
  { id: '982747', name: 'Student 14', status: 'present', img: null },
];

export default function ClassRoster() {
  const { needsAuth } = useAuth();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (needsAuth) {
      alert('Please sign in with Google in the sidebar to export data.');
      return;
    }

    const confirmed = window.confirm(
      `Export the CS101 roster to a new Google Sheet? This will create a new file in your Google Drive.`
    );
    if (!confirmed) return;

    setIsExporting(true);
    try {
      const headers = ['Student ID', 'Name', 'Status'];
      const rows = mockStudents.map(s => [
        s.id, s.name, s.status.toUpperCase()
      ]);

      const url = await exportToGoogleSheets(`CS101 Roster - ${new Date().toLocaleDateString()}`, headers, rows);
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
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-1">
            <span className="uppercase tracking-wider text-xs">Computer Science Dept</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">Room 402</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">CS101 - Intro to Programming</h1>
          <p className="text-slate-600">Session: Monday, Oct 24, 2024 • 10:00 AM - 11:30 AM</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-sm disabled:opacity-50 transition-colors"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} 
            {isExporting ? 'Exporting...' : 'Export Report'}
          </button>
          <button className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 flex items-center gap-2 shadow-sm">
            <AlertTriangle className="w-4 h-4" /> Notify Absent Students
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-blue-600 shadow-sm border-l-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Enrolled</p>
          <div className="flex items-end gap-3">
            <h3 className="text-4xl font-bold text-slate-900">32</h3>
            <Users className="w-6 h-6 text-slate-400 mb-1" />
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Present</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-bold text-emerald-500">28</h3>
            <span className="text-sm font-medium text-slate-500">87.5%</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-red-500">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Absent</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-bold text-red-500">3</h3>
            <span className="text-sm font-medium text-slate-500">9.4%</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-amber-500">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Late</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-bold text-amber-500">1</h3>
            <span className="text-sm font-medium text-slate-500">3.1%</span>
          </div>
        </div>
      </div>

      <div className="flex gap-6 flex-1">
        {/* Roster & Rapid Status */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Roster & Rapid Status</h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-md text-sm w-64"
              />
            </div>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4 overflow-y-auto">
            {mockStudents.map((student) => (
              <div key={student.id} className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {student.img ? (
                    <img src={student.img} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <Users className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-sm text-slate-900">{student.name}</p>
                    <p className="text-xs text-slate-500">ID: {student.id}</p>
                  </div>
                </div>
                <div className="flex gap-1 bg-slate-50 p-1 rounded-md border border-slate-200">
                  <button className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold transition-colors ${student.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-400 hover:bg-slate-200'}`}>P</button>
                  <button className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold transition-colors ${student.status === 'absent' ? 'bg-red-100 text-red-700' : 'text-slate-400 hover:bg-slate-200'}`}>A</button>
                  <button className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold transition-colors ${student.status === 'late' ? 'bg-amber-100 text-amber-700' : 'text-slate-400 hover:bg-slate-200'}`}>L</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Historical Attendance Trend</h3>
            <div className="h-40 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <Tooltip cursor={{fill: '#f1f5f9'}} />
                  <Bar dataKey="present" fill="#818CF8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="absolute right-2 top-0 text-xs font-semibold text-blue-600 bg-white px-2 py-0.5 rounded shadow-sm">Today</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex-1">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Session Insights</h3>
            
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Consecutive Absences</p>
                <p className="text-sm text-slate-700 mt-1">Marcus Johnson has missed 3 consecutive sessions. Intervention recommended.</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Below Threshold</p>
                <p className="text-sm text-slate-700 mt-1">2 students are currently below the 80% attendance requirement for this course.</p>
              </div>
            </div>

            <button className="w-full py-2.5 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              View Full Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
