
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Dashboard from '@/components/dashboard/Dashboard';
import StudentManagement from '@/components/students/StudentManagement';
import StaffManagement from '@/components/staff/StaffManagement';
import FeeManagement from '@/components/fees/FeeManagement';
import AttendanceManagement from '@/components/attendance/AttendanceManagement';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onSectionChange={setActiveSection} />;
      case 'students':
        return <StudentManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'fees':
        return <FeeManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'exams':
        return (
          <div className="text-center py-16 animate-fade-in">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 islamic-pattern">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-shadow">Exam Management</h2>
              <p className="text-gray-600">Comprehensive exam management system coming soon...</p>
              <div className="mt-6 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white font-bold text-xl">📝</span>
              </div>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="text-center py-16 animate-fade-in">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 islamic-pattern">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-shadow">Reports & Analytics</h2>
              <p className="text-gray-600">Advanced reporting and analytics dashboard coming soon...</p>
              <div className="mt-6 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white font-bold text-xl">📊</span>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-16 animate-fade-in">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 islamic-pattern">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-shadow">System Settings</h2>
              <p className="text-gray-600">Comprehensive settings and configuration panel coming soon...</p>
              <div className="mt-6 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white font-bold text-xl">⚙️</span>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <Header />
      <main className="ml-64 pt-16 p-6 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
