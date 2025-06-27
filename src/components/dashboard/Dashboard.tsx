
import React from 'react';
import StatsCard from './StatsCard';
import { 
  Users, 
  GraduationCap, 
  CreditCard, 
  TrendingUp,
  Calendar,
  Clock,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface DashboardProps {
  onSectionChange?: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSectionChange }) => {
  const { toast } = useToast();
  
  const stats = [
    {
      title: 'Total Students',
      value: '1,247',
      icon: GraduationCap,
      trend: '+12% from last month',
      trendUp: true,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Staff',
      value: '89',
      icon: Users,
      trend: '+3 new this month',
      trendUp: true,
      color: 'bg-emerald-500'
    },
    {
      title: 'Monthly Revenue',
      value: '₹2,45,000',
      icon: CreditCard,
      trend: '+8% from last month',
      trendUp: true,
      color: 'bg-amber-500'
    },
    {
      title: 'Attendance Rate',
      value: '92.5%',
      icon: Clock,
      trend: '-2% from last week',
      trendUp: false,
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    { id: 1, activity: 'New student admission - Ahmed Ali', time: '2 hours ago', type: 'admission' },
    { id: 2, activity: 'Fee payment received from Fatima Khan', time: '4 hours ago', type: 'payment' },
    { id: 3, activity: 'Staff meeting scheduled for tomorrow', time: '6 hours ago', type: 'meeting' },
    { id: 4, activity: 'Monthly exam results published', time: '1 day ago', type: 'exam' },
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-student':
        onSectionChange?.('students');
        toast({
          title: "Navigate to Students",
          description: "Redirecting to Student Management to add new student",
        });
        break;
      case 'add-staff':
        onSectionChange?.('staff');
        toast({
          title: "Navigate to Staff",
          description: "Redirecting to Staff Management to add new staff",
        });
        break;
      case 'generate-report':
        toast({
          title: "Generate Report",
          description: "Report generation feature coming soon!",
        });
        break;
      case 'mark-attendance':
        onSectionChange?.('attendance');
        toast({
          title: "Navigate to Attendance",
          description: "Redirecting to Attendance Management",
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at your Madrasah today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="hover-scale">
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Charts and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Collection Progress */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Monthly Fee Collection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Current Month Progress</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Collected</p>
                <p className="font-semibold text-green-600">₹1,83,750</p>
              </div>
              <div>
                <p className="text-gray-600">Pending</p>
                <p className="font-semibold text-amber-600">₹61,250</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => handleQuickAction('add-student')}
              className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover-scale"
            >
              <GraduationCap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Add Student</p>
            </button>
            <button 
              onClick={() => handleQuickAction('add-staff')}
              className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover-scale"
            >
              <Users className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Add Staff</p>
            </button>
            <button 
              onClick={() => handleQuickAction('generate-report')}
              className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover-scale"
            >
              <FileText className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Generate Report</p>
            </button>
            <button 
              onClick={() => handleQuickAction('mark-attendance')}
              className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover-scale"
            >
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Mark Attendance</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
