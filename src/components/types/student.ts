export interface Student {
  id: string;
  name: string;
  class: string;
  age: number;
  guardianName: string;
  phone: string;
  email: string;
  address: string;
  feeStatus: 'paid' | 'pending';
  admissionDate: string;    // must provide a string date
  attendance: number;       // a number (e.g., count of days attended)
  fingerprint: string | null;
  fees: number;
  paid: number;
}

export interface CourseCompletionData extends Student {
  originalId: string;
  finalGrade: string;
  courseCompleted: string;
  completionDate: string;
  achievements: string[];
  remarks: string;
  currentStatus: string;
  graduationYear: string;
  pastStudentId: string;
}
// src/types/student.ts

export interface PastStudent {
  id: string;
  name: string;
  class: string;
  graduationYear: string;
  phone: string;
  email: string;
  address: string;
  finalGrade: string;
  attendance: number;
  courseCompleted: string;
  currentStatus: string;
  achievements?: string | string[];
  graduationDate: string;
  guardian: string;
}



