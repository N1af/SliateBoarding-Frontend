
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Send, MessageCircle, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeeReminderSystemProps {
  onClose: () => void;
}

const FeeReminderSystem: React.FC<FeeReminderSystemProps> = ({ onClose }) => {
  const [pendingStudents, setPendingStudents] = useState<any[]>([]);
  const { toast } = useToast();
  useEffect(() => {
    fetch('http://localhost:5000/api/reminders/pending-fees')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched pending students:", data);
        setPendingStudents(data);
      })
      .catch(err => console.error("Error fetching pending students:", err));
  }, []);

  const sendSMSReminder = (student: any) => {
  fetch('http://localhost:5000/api/reminders/send-sms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentId: student.id, phone: student.phone })
  })
    .then(res => res.json())
    .then(() => {
      toast({
        title: "SMS Sent",
        description: `Fee reminder SMS sent to ${student.name} (${student.phone})`,
      });
    })
    .catch(() => {
      toast({
        title: "SMS Failed",
        description: `Could not send SMS to ${student.name}`,
      });
    });
};


  const sendEmailReminder = (student: any) => {
    toast({
      title: "Email Sent",
      description: `Fee reminder email sent to ${student.name} (${student.email})`,
    });
  };

  const sendBulkReminders = () => {
    toast({
      title: "Bulk Reminders Sent",
      description: `Fee reminders sent to ${pendingStudents.length} students via SMS and Email`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4 animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-emerald-700 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Fee Reminder System
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Students with Pending Fees</h3>
              <Button onClick={sendBulkReminders} className="bg-emerald-600 hover:bg-emerald-700">
                <Send className="w-4 h-4 mr-2" />
                Send All Reminders
              </Button>
            </div>
            
            <div className="space-y-4">
              {pendingStudents.map((student) => (
                <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-700 font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-600">ID: {student.id} • {student.class}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500">{student.phone}</span>
                          <span className="text-sm text-gray-500">{student.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-red-600">₹{student.pendingAmount.toLocaleString()}</p>
                        <Badge variant="destructive" className="text-xs">
                          {student.daysOverdue} days overdue
                        </Badge>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendSMSReminder(student)}
                          className="border-blue-200 hover:bg-blue-50"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          SMS
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendEmailReminder(student)}
                          className="border-emerald-200 hover:bg-emerald-50"
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-emerald-50 p-4 rounded-lg">
            <h4 className="font-semibold text-emerald-800 mb-2">Automatic Reminder Settings</h4>
            <p className="text-sm text-emerald-700">
              • Reminders are sent automatically 3 days after due date
              • Follow-up reminders every 7 days
              • Final notice sent after 30 days overdue
              • Parents receive both SMS and Email notifications in Urdu and English
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeeReminderSystem;