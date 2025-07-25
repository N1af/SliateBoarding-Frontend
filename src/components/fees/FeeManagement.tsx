
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Plus, 
  Filter, 
  Download,
  DollarSign,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import FeePaymentModal from './FeePaymentModal';
import FeeReminderSystem from './FeeReminderSystem';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const FeeManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReminderSystem, setShowReminderSystem] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const { toast } = useToast();
  const fetchFees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/fees');
        const data = await response.json();
        setFeeRecords(data);
      } catch (error) {
        console.error('Error fetching fees:', error);
      }
    };
  useEffect(() => {
    fetchFees();
  }, []);

  const [feeRecords, setFeeRecords] = useState<any[]>([]);

  const filteredRecords = feeRecords.filter(record =>
    record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.class.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const openPaymentModal = (student: any) => {
    setSelectedStudent(student);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedStudent(null);
  };

  const handlePayment = async (payment: any) => {
    try {
      const response = await axios.post('http://localhost:5000/api/fees/pay', payment);
      
      if (response.data.success) {
        toast({
          title: 'Payment Success',
          description: 'Payment recorded successfully.',
        });
        fetchFees(); // refresh data
      } else {
        toast({
          title: 'Payment Failed',
          description: 'Failed to record payment. Please try again.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Error',
        description: 'Error while recording payment.',
        variant: 'destructive'
      });
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Student ID', 'Name', 'Class', 'Total Fee', 'Paid', 'Pending', 'Status', 'Due Date'],
      ...filteredRecords.map(record => [
        record.studentId,
        record.studentName,
        record.class,
        record.totalFee,
        record.paidAmount,
        record.pendingAmount,
        record.status,
        record.dueDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fee_records_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Fee records have been exported to CSV file.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'partial':
        return <Badge className="bg-amber-100 text-amber-800">Partial</Badge>;
      case 'pending':
        return <Badge variant="destructive">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const totalCollected = feeRecords.reduce((acc, record) => acc + record.paidAmount, 0);
  const totalPending = feeRecords.reduce((acc, record) => acc + record.pendingAmount, 0);
  const collectionRate = (totalCollected / (totalCollected + totalPending) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee Management</h1>
          <p className="text-gray-600">Track student fees, payments, and collections</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setShowReminderSystem(true)}
            className="hover-scale"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Reminders
          </Button>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 hover-scale"
            onClick={() => setShowPaymentModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Fee Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Collections</p>
                <p className="text-2xl font-bold text-green-600">RS.{totalCollected.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold text-amber-600">RS.{totalPending.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                <p className="text-2xl font-bold text-blue-600">{collectionRate}%</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{feeRecords.filter(r => r.status === 'pending').length}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collection Progress */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle>Monthly Collection Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>January 2024 Collection</span>
                <span>RS.{totalCollected.toLocaleString()} / RS.{(totalCollected + totalPending).toLocaleString()} ({collectionRate}%)</span>
              </div>
              <Progress value={parseFloat(collectionRate)} className="h-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-green-600 font-semibold">Collected</p>
                <p className="text-lg font-bold text-green-700">RS.{totalCollected.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <p className="text-amber-600 font-semibold">Pending</p>
                <p className="text-lg font-bold text-amber-700">RS.{totalPending.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-600 font-semibold">Target</p>
                <p className="text-lg font-bold text-blue-700">RS.{(totalCollected + totalPending).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search by student name, ID, or class..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="hover-scale">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" onClick={handleExport} className="hover-scale">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fee Records */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle>Fee Records ({filteredRecords.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover-scale">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-emerald-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{record.studentName}</h3>
                      <p className="text-sm text-gray-600">ID: {record.studentId} • {record.class}</p>
                      <p className="text-xs text-gray-500">Due Date: {record.dueDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Fee</p>
                      <p className="text-lg font-semibold">RS.{record.totalFee.toLocaleString()}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Paid</p>
                      <p className="text-lg font-semibold text-green-600">RS.{record.paidAmount.toLocaleString()}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-lg font-semibold text-red-600">RS.{record.pendingAmount.toLocaleString()}</p>
                    </div>
                    
                    <div className="text-right">
                      {getStatusBadge(record.status)}
                      <div className="mt-2 space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedStudent(record);
                            setShowPaymentModal(true);
                          }}
                          className="hover-scale"
                        >
                          Record Payment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showPaymentModal && selectedStudent && (
        <FeePaymentModal
          student={selectedStudent}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedStudent(null);
          }}
          onPayment={handlePayment}
        />
      )}


      {showReminderSystem && (
        <FeeReminderSystem
          onClose={() => setShowReminderSystem(false)}
        />
      )}
    </div>
  );
};

export default FeeManagement;
