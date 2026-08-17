import { Download, Filter, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function StudentReport() {
  const heatmapData = [
    [null, 1, 2, 3, 4, 5, null],
    [null, 8, 9, 10, 11, 12, null],
  ];

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Attendance Report</h1>
          <p className="text-slate-600">Detailed history for Sarah Jenkins • Fall Semester 2024</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Overall Attendance</p>
          <div className="flex flex-col gap-1">
            <h3 className="text-4xl font-bold text-blue-600">92.4%</h3>
            <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
              ↗ +1.2% from last term
            </span>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Classes</p>
          <div className="flex flex-col gap-1">
            <h3 className="text-4xl font-bold text-slate-900">145</h3>
            <span className="text-sm text-slate-500">Across 6 subjects</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Absences</p>
          <div className="flex flex-col gap-1">
            <h3 className="text-4xl font-bold text-red-500">11</h3>
            <span className="text-sm text-slate-500">4 Unexcused</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tardies</p>
          <div className="flex flex-col gap-1">
            <h3 className="text-4xl font-bold text-amber-500">3</h3>
            <span className="text-sm text-slate-500">Average 5m late</span>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Heatmap Area */}
        <div className="flex-[2] bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Attendance Heatmap</h3>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
              <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft className="w-5 h-5" /></button>
              <span>October 2024</span>
              <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-500">
              <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {heatmapData[0].map((day, i) => (
                <div key={`w1-${i}`} className={`aspect-square rounded-sm flex items-center justify-center text-sm font-medium ${
                  day === null ? 'bg-slate-50' : 
                  day === 3 ? 'bg-red-100 text-red-700' :
                  day === 5 ? 'bg-amber-100 text-amber-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>
                  {day}
                </div>
              ))}
              {heatmapData[1].map((day, i) => (
                <div key={`w2-${i}`} className={`aspect-square rounded-sm flex items-center justify-center text-sm font-medium ${
                  day === null ? 'bg-slate-50' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {day}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-500">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-100 rounded-sm"></div> Present</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-100 rounded-sm"></div> Absent</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-100 rounded-sm"></div> Tardy</div>
            </div>
          </div>
        </div>

        {/* By Subject */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">By Subject</h3>
          </div>
          <div className="p-5 flex flex-col gap-6">
            {[
              { name: 'AP Physics', prof: 'Prof. Smith', pct: '98%', status: '1 A / 0 T' },
              { name: 'World Literature', prof: 'Prof. Davis', pct: '85%', status: '4 A / 2 T', isLow: true },
              { name: 'Calculus II', prof: 'Prof. Chen', pct: '94%', status: '2 A / 0 T' },
              { name: 'Computer Science', prof: 'Prof. Turing', pct: '100%', status: '0 A / 0 T' },
            ].map((sub, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-sm text-slate-900">{sub.name}</p>
                  <p className="text-xs text-slate-500">{sub.prof}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${sub.isLow ? 'text-red-600' : 'text-slate-900'}`}>{sub.pct}</p>
                  <p className="text-xs text-slate-500">{sub.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Record */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl">
          <h3 className="text-lg font-bold text-slate-900">Detailed Record</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500 font-semibold text-xs">
            <tr>
              <th className="p-4 w-32">Date</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
              <th className="p-4">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-medium text-slate-900">Oct 12, 2024</td>
              <td className="p-4 text-slate-600">World Literature</td>
              <td className="p-4 text-slate-600">10:00 AM</td>
              <td className="p-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  <XCircle className="w-3.5 h-3.5" /> Absent
                </span>
              </td>
              <td className="p-4 text-slate-600">Doctor's appointment (Note provided)</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-medium text-slate-900">Oct 12, 2024</td>
              <td className="p-4 text-slate-600">Calculus II</td>
              <td className="p-4 text-slate-600">1:00 PM</td>
              <td className="p-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                  <Clock className="w-3.5 h-3.5" /> Tardy
                </span>
              </td>
              <td className="p-4 text-slate-600">Arrived 10 mins late</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-medium text-slate-900">Oct 11, 2024</td>
              <td className="p-4 text-slate-600">AP Physics</td>
              <td className="p-4 text-slate-600">8:30 AM</td>
              <td className="p-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Present
                </span>
              </td>
              <td className="p-4 text-slate-600">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
