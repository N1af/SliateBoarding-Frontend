
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Save, IndianRupee } from 'lucide-react';

interface FeePaymentModalProps {
  student: any;
  onClose: () => void;
  onPayment: (payment: any) => void;
}

const FeePaymentModal: React.FC<FeePaymentModalProps> = ({ student, onClose, onPayment }) => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMethod: '',
    remarks: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payment = {
      studentId: student.studentId,
      studentName: student.studentName,
      amount: parseInt(paymentData.amount),
      paymentMethod: paymentData.paymentMethod,
      remarks: paymentData.remarks,
      paymentDate: new Date().toISOString().split('T')[0],
      receiptNo: `RC${Date.now()}`
    };
    onPayment(payment); // this function will do the API call now
    onClose();
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-md m-4 animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-emerald-700">Record Payment</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-emerald-50 rounded-lg">
            <h3 className="font-semibold text-emerald-800">{student.studentName}</h3>
            <p className="text-sm text-emerald-600">ID: {student.studentId} • {student.class}</p>
            <div className="flex justify-between mt-2 text-sm">
              <span>Total Fee: ₹{student.totalFee?.toLocaleString()}</span>
              <span>Pending: ₹{student.pendingAmount?.toLocaleString()}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="amount">Payment Amount (₹)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={paymentData.amount}
                onChange={handleChange}
                max={student.pendingAmount}
                required
              />
            </div>
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select onValueChange={(value) => setPaymentData({...paymentData, paymentMethod: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="remarks">Remarks (Optional)</Label>
              <Input
                id="remarks"
                name="remarks"
                value={paymentData.remarks}
                onChange={handleChange}
                placeholder="Additional notes..."
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="w-4 h-4 mr-2" />
                Record Payment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeePaymentModal;