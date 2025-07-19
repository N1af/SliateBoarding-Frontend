
import React, { ReactElement } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatsCard from './StatsCard';
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  Calendar,
  Database,
  Settings,
  FileText,
  BookOpen
} from 'lucide-react';

interface DashboardProps {
  onSectionChange: (section: string) => void;
  onDatabaseAccess: () => void;
}
type QuickAction = {
  title: string;
  section?: string;
  action?: string;
  icon: React.ElementType;
  color: string;
};
const Dashboard: React.FC<DashboardProps> = ({ onSectionChange, onDatabaseAccess }) => {
  const stats = [
    { title: 'Total Students', value: '156', icon: Users, color: 'blue' },
    { title: 'Active Staff', value: '12', icon: GraduationCap, color: 'green' },
    { title: 'Monthly Revenue', value: '₹45,000', icon: DollarSign, color: 'emerald' },
    { title: 'Attendance Rate', value: '92%', icon: Calendar, color: 'amber' }
  ];

  const quickActions = [
    { title: 'Add New Student', section: 'students', icon: Users, color: 'blue' },
    { title: 'Mark Attendance', section: 'attendance', icon: Calendar, color: 'green' },
    { title: 'Fee Management', section: 'fees', icon: DollarSign, color: 'emerald' },
    { title: 'Generate Reports', section: 'reports', icon: FileText, color: 'purple' },
    { title: 'System Settings', section: 'settings', icon: Settings, color: 'gray' },
    { title: 'Database Access', action: 'database', icon: Database, color: 'red' }
  ];

  const handleQuickAction = (item: QuickAction) => {
    if (item.action === 'database') {
      onDatabaseAccess();
    } else {
      onSectionChange(item.section);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 islamic-pattern-text">
          Welcome to Madrasa Management System
        </h1>
        <p className="text-gray-600 text-lg">Comprehensive Islamic education management platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <Card className="islamic-pattern">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 hover-scale islamic-card-hover"
                onClick={() => handleQuickAction(action)}
              >
                <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                <span className="text-sm font-medium">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
