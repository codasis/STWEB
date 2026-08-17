/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import AdminDashboard from './pages/AdminDashboard';
import ClassRoster from './pages/ClassRoster';
import StudentReport from './pages/StudentReport';
import StudentDashboard from './pages/StudentDashboard';

function Layout() {
  const location = useLocation();
  const isStudent = location.pathname.startsWith('/student');

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar role={isStudent ? 'student' : 'admin'} />
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/classes" element={<ClassRoster />} />
          <Route path="/reports" element={<StudentReport />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
