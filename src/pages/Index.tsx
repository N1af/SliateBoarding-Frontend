
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
          <div className="text-center py-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Management</h2>
            <p className="text-gray-600">Exam management module coming soon...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="text-center py-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports & Analytics</h2>
            <p className="text-gray-600">Comprehensive reporting module coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">System Settings</h2>
            <p className="text-gray-600">Settings and configuration panel coming soon...</p>
          </div>
        );
      default:
        return <Dashboard onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <Header />
      <main className="ml-64 pt-16 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
