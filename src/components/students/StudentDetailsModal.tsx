
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Phone, Mail, MapPin, Calendar, User } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  class: string;
  age: number;
  guardianName: string;
  phone: string;
  email: string;
  address: string;
  feeStatus: string;
  admissionDate: string;
  attendance: number;
}

interface StudentDetailsModalProps {
  student: Student;
  onClose: () => void;
}

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Student Details</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-700 font-semibold text-xl">
                {student.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
              <p className="text-gray-600">ID: {student.id}</p>
              <Badge 
                variant={student.feeStatus === 'paid' ? 'default' : 'destructive'}
                className={student.feeStatus === 'paid' ? 'bg-green-100 text-green-800' : ''}
              >
                {student.feeStatus === 'paid' ? 'Fee Paid' : 'Fee Pending'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Class</p>
                  <p className="text-gray-600">{student.class}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Age</p>
                  <p className="text-gray-600">{student.age} years</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Guardian</p>
                  <p className="text-gray-600">{student.guardianName}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">{student.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{student.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">{student.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{student.attendance}%</p>
              <p className="text-sm text-gray-600">Attendance Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{student.admissionDate}</p>
              <p className="text-sm text-gray-600">Admission Date</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDetailsModal;
