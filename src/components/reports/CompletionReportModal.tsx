
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X, CheckCircle, XCircle, GraduationCap, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CompletionReportModalProps {
  student: any;
  onClose: () => void;
  onComplete: (completionData: any) => void;
  onIncomplete: (reason: string) => void;
}

const CompletionReportModal: React.FC<CompletionReportModalProps> = ({ 
  student, 
  onClose, 
  onComplete, 
  onIncomplete 
}) => {
  const [completionStatus, setCompletionStatus] = useState<'pending' | 'completed' | 'incomplete'>('pending');
  const [reason, setReason] = useState('');
  const [finalGrade, setFinalGrade] = useState('A');
  const { toast } = useToast();

  const handleComplete = () => {
    if (completionStatus === 'completed') {
      const completionData = {
        ...student,
        finalGrade,
        completionDate: new Date().toISOString().split('T')[0],
        graduationYear: new Date().getFullYear().toString(),
        pastStudentId: `PST${String(Date.now()).slice(-3)}`,
        originalId: student.id
      };
      onComplete(completionData);
      toast({
        title: "Student Completed",
        description: `${student.name} moved to past students with grade ${finalGrade}.`,
      });
    } else if (completionStatus === 'incomplete') {
      onIncomplete(reason);
      toast({
        title: "Course Incomplete",
        description: `${student.name} marked as incomplete. Reason recorded.`,
        variant: "destructive"
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 animate-scale-in">
        <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <CardTitle>Course Completion Report - {student.name}</CardTitle>
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
                  <p className="text-sm text-emerald-600">Current Attendance: {student.attendance || 'N/A'}%</p>
                </div>
              </div>
            </div>

            {/* Completion Status Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Course Completion Status</Label>
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={completionStatus === 'completed' ? 'default' : 'outline'}
                  onClick={() => setCompletionStatus('completed')}
                  className={`h-20 flex flex-col items-center justify-center space-y-2 ${
                    completionStatus === 'completed' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50'
                  }`}
                >
                  <CheckCircle className="w-6 h-6" />
                  <span>Completed</span>
                </Button>
                
                <Button
                  variant={completionStatus === 'incomplete' ? 'destructive' : 'outline'}
                  onClick={() => setCompletionStatus('incomplete')}
                  className={`h-20 flex flex-col items-center justify-center space-y-2 ${
                    completionStatus === 'incomplete' ? '' : 'hover:bg-red-50'
                  }`}
                >
                  <XCircle className="w-6 h-6" />
                  <span>Incomplete</span>
                </Button>
              </div>
            </div>

            {/* Completion Details */}
            {completionStatus === 'completed' && (
              <div className="space-y-4 bg-green-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="finalGrade">Final Grade</Label>
                  <select
                    id="finalGrade"
                    value={finalGrade}
                    onChange={(e) => setFinalGrade(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {['A+', 'A', 'B+', 'B', 'C+', 'C', 'D'].map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
                <div className="bg-green-100 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-800 font-medium">
                      Student will be moved to Past Students section upon completion.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {completionStatus === 'incomplete' && (
              <div className="space-y-4 bg-red-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Incompletion</Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please provide the reason why the course is incomplete..."
                    rows={3}
                    required
                  />
                </div>
                <div className="bg-red-100 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-red-800 font-medium">
                      Student will remain in current students with incomplete status.
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleComplete}
                disabled={completionStatus === 'pending' || (completionStatus === 'incomplete' && !reason.trim())}
                className={completionStatus === 'completed' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
              >
                {completionStatus === 'completed' ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Completed
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-2" />
                    Mark as Incomplete
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompletionReportModal;
