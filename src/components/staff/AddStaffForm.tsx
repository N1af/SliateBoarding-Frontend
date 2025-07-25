import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddStaffFormProps {
  onClose: () => void;
  onSave: (staff: any) => void;
}

const AddStaffForm: React.FC<AddStaffFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: '',
    phone: '',
    email: '',
    address: '',
    salary: '',
    experience: '',
    joiningDate: new Date().toISOString().split('T')[0]
  });

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newStaff = {
      id: `SF${String(Date.now()).slice(-3)}`,
      ...formData,
      salary: parseInt(formData.salary),
      status: 'active'
    };

    try {
      const response = await fetch('http://localhost:5000/api/staff/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStaff)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: 'Staff Added',
          description: `${newStaff.name} has been successfully added.`
        });
        onSave(newStaff);
        onClose();
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to add staff.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Server Error',
        description: 'Could not connect to backend.',
        variant: 'destructive'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-emerald-700">Add New Staff Member</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input id="designation" name="designation" value={formData.designation} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input id="department" name="department" value={formData.department} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input id="experience" name="experience" value={formData.experience} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="salary">Monthly Salary (₹)</Label>
                <Input id="salary" name="salary" type="number" value={formData.salary} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="joiningDate">Joining Date</Label>
                <Input id="joiningDate" name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="w-4 h-4 mr-2" />
                Save Staff Member
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddStaffForm;
