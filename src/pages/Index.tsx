import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Dashboard from '@/components/dashboard/Dashboard';
import StudentManagement from '@/components/students/StudentManagement';
import StaffManagement from '@/components/staff/StaffManagement';
import FeeManagement from '@/components/fees/FeeManagement';
import AttendanceManagement from '@/components/attendance/AttendanceManagement';
import ReportsManagement from '@/components/reports/ReportsManagement';
import SettingsManagement from '@/components/settings/SettingsManagement';
import PastStudentsManagement from '@/components/students/PastStudentsManagement';
import DatabaseAuthModal from '@/components/database/DatabaseAuthModal';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showDatabaseAuth, setShowDatabaseAuth] = useState(false);
  const [isDatabaseAuthenticated, setIsDatabaseAuthenticated] = useState(false);

  const handleDatabaseAccess = () => {
    if (!isDatabaseAuthenticated) {
      setShowDatabaseAuth(true);
    } else {
      // Database is already authenticated, show database management
      setActiveSection('database');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onSectionChange={setActiveSection} onDatabaseAccess={handleDatabaseAccess} />;
      case 'students':
        return <StudentManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'fees':
        return <FeeManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'reports':
        return <ReportsManagement />;
      case 'settings':
        return <SettingsManagement />;
      case 'past-students':
        return <PastStudentsManagement />;
      case 'database':
        return (
          <div className="text-center py-16 animate-fade-in">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 islamic-pattern">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-shadow">Database Management</h2>
              <p className="text-gray-600">Database access granted. Full system database management available.</p>
              <div className="mt-6 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white font-bold text-xl">🗄️</span>
              </div>
            </div>
          </div>
        );
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
      default:
        return <Dashboard onSectionChange={setActiveSection} onDatabaseAccess={handleDatabaseAccess} />;
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

      {/* Database Authentication Modal */}
      {showDatabaseAuth && (
        <DatabaseAuthModal
          onClose={() => setShowDatabaseAuth(false)}
          onAuthenticated={() => setIsDatabaseAuthenticated(true)}
        />
      )}
    </div>
  );
};

export default Index;
