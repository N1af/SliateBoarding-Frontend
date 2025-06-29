
import { useToast } from '@/hooks/use-toast';

class NotificationService {
  private static instance: NotificationService;
  private toast: any = null;

  static getInstance() {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  setToast(toastFunction: any) {
    this.toast = toastFunction;
  }

  // Student Management Notifications
  studentAdded(studentName: string) {
    this.toast?.({
      title: "New Student Added",
      description: `Student ${studentName} has been successfully registered.`,
      variant: "default"
    });
  }

  // Staff Management Notifications
  staffAdded(staffName: string) {
    this.toast?.({
      title: "New Staff Added", 
      description: `Staff member ${staffName} has been successfully registered.`,
      variant: "default"
    });
  }

  // Fee Management Notifications
  feesPaid(studentName: string, amount: string) {
    this.toast?.({
      title: "Fee Payment Received",
      description: `${studentName} paid RS. ${amount} successfully.`,
      variant: "default"
    });
  }

  // Attendance Notifications
  attendanceMarked(studentName: string, status: string) {
    this.toast?.({
      title: "Attendance Marked",
      description: `${studentName} marked as ${status}.`,
      variant: "default"
    });
  }

  // Fingerprint Notifications
  fingerprintEnrolled(studentName: string) {
    this.toast?.({
      title: "Fingerprint Enrolled",
      description: `${studentName}'s fingerprint has been successfully registered.`,
      variant: "default"
    });
  }

  fingerprintScanned(studentName: string) {
    this.toast?.({
      title: "Fingerprint Scanned",
      description: `${studentName}'s fingerprint was scanned successfully.`,
      variant: "default"
    });
  }

  // Reports Notifications
  reportCompleted(studentName: string) {
    this.toast?.({
      title: "Course Completed",
      description: `${studentName} has completed their course and moved to past students.`,
      variant: "default"
    });
  }

  // Past Students Notifications
  studentMovedToPast(studentName: string) {
    this.toast?.({
      title: "Student Graduated",
      description: `${studentName} has been moved to past students records.`,
      variant: "default"
    });
  }
}

export const notificationService = NotificationService.getInstance();
