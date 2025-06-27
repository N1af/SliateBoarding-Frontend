
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, GraduationCap, Award, FileCheck, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CourseCompletionModalProps {
  student: any;
  onClose: () => void;
  onComplete: (completionData: any) => void;
}

const CourseCompletionModal: React.FC<CourseCompletionModalProps> = ({ student, onClose, onComplete }) => {
  const [completionData, setCompletionData] = useState({
    finalGrade: 'A',
    courseCompleted: 'Islamic Studies & Modern Education',
    completionDate: new Date().toISOString().split('T')[0],
    achievements: [] as string[],
    remarks: '',
    currentStatus: 'Higher Education',
    verified: false
  });

  const [newAchievement, setNewAchievement] = useState('');
  const { toast } = useToast();

  const gradeOptions = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];
  const statusOptions = ['Higher Education', 'Teaching', 'Working', 'Continuing Education', 'Other'];

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setCompletionData({
        ...completionData,
        achievements: [...completionData.achievements, newAchievement.trim()]
      });
      setNewAchievement('');
    }
  };

  const handleRemoveAchievement = (index: number) => {
    setCompletionData({
      ...completionData,
      achievements: completionData.achievements.filter((_, i) => i !== index)
    });
  };

  const handleVerifyAndComplete = () => {
    if (!completionData.verified) {
      toast({
        title: "Verification Required",
        description: "Please verify the completion details before proceeding.",
        variant: "destructive"
      });
      return;
    }

    const finalData = {
      ...student,
      ...completionData,
      graduationYear: new Date().getFullYear().toString(),
      pastStudentId: `PST${String(Date.now()).slice(-3)}`,
      originalId: student.id
    };

    onComplete(finalData);
    
    toast({
      title: "Course Completed",
      description: `${student.name} has been successfully moved to past students.`,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 animate-scale-in islamic-pattern">
        <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <CardTitle>Complete Course - {student.name}</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Student Info */}
            <div className="bg-emerald-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  {student.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{student.name}</h3>
                  <p className="text-sm text-gray-600">ID: {student.id} • {student.class}</p>
                  <p className="text-sm text-emerald-600">Current Attendance: {student.attendance}%</p>
                </div>
              </div>
            </div>

            {/* Course Completion Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="finalGrade">Final Grade</Label>
                  <select
                    id="finalGrade"
                    value={completionData.finalGrade}
                    onChange={(e) => setCompletionData({...completionData, finalGrade: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {gradeOptions.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="completionDate">Completion Date</Label>
                  <Input
                    id="completionDate"
                    type="date"
                    value={completionData.completionDate}
                    onChange={(e) => setCompletionData({...completionData, completionDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseCompleted">Course Completed</Label>
                <Input
                  id="courseCompleted"
                  value={completionData.courseCompleted}
                  onChange={(e) => setCompletionData({...completionData, courseCompleted: e.target.value})}
                  placeholder="e.g., Islamic Studies & Modern Education"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentStatus">Current Status</Label>
                <select
                  id="currentStatus"
                  value={completionData.currentStatus}
                  onChange={(e) => setCompletionData({...completionData, currentStatus: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Achievements */}
              <div className="space-y-2">
                <Label>Achievements & Awards</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    placeholder="Add achievement or award"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddAchievement()}
                  />
                  <Button type="button" onClick={handleAddAchievement} variant="outline">
                    <Award className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {completionData.achievements.map((achievement, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{achievement}</span>
                      <button
                        onClick={() => handleRemoveAchievement(index)}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  value={completionData.remarks}
                  onChange={(e) => setCompletionData({...completionData, remarks: e.target.value})}
                  placeholder="Any additional remarks or notes..."
                  rows={3}
                />
              </div>

              {/* Verification */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="verification"
                    checked={completionData.verified}
                    onChange={(e) => setCompletionData({...completionData, verified: e.target.checked})}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <Label htmlFor="verification" className="text-amber-800 font-medium">
                    I verify that all the information provided is accurate and the student has successfully completed the course requirements.
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleVerifyAndComplete} 
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={!completionData.verified}
              >
                <Send className="w-4 h-4 mr-2" />
                Complete & Move to Alumni
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCompletionModal;
