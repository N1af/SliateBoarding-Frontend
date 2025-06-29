
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Fingerprint, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { notificationService } from '@/services/notificationService';

interface FingerprintScannerProps {
  studentId: string;
  studentName: string;
  onScanComplete: (fingerprintData: any) => void;
  onCancel: () => void;
  isActive: boolean;
}

const FingerprintScanner: React.FC<FingerprintScannerProps> = ({
  studentId,
  studentName,
  onScanComplete,
  onCancel,
  isActive
}) => {
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'failed' | 'suspicious'>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isScanning && scanStatus === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            simulateFingerprintScan();
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isScanning, scanStatus]);

  const simulateFingerprintScan = () => {
    const random = Math.random();
    
    if (random > 0.8) {
      setScanStatus('suspicious');
      toast({
        title: "Suspicious Activity Detected",
        description: "Fingerprint doesn't match registered student. Please verify identity.",
        variant: "destructive"
      });
      onScanComplete({
        status: 'suspicious',
        studentId,
        studentName,
        message: 'Fingerprint mismatch detected'
      });
    } else if (random > 0.1) {
      setScanStatus('success');
      toast({
        title: "Fingerprint Verified",
        description: `${studentName} successfully verified.`,
      });
      // Send notification for fingerprint scan
      notificationService.fingerprintScanned(studentName);
      onScanComplete({
        status: 'success',
        studentId,
        studentName,
        fingerprintId: `FP_${studentId}_${Date.now()}`
      });
    } else {
      setScanStatus('failed');
      toast({
        title: "Scan Failed",
        description: "Please clean your finger and try again.",
        variant: "destructive"
      });
    }
    setIsScanning(false);
  };

  const startScan = () => {
    setScanStatus('scanning');
    setScanProgress(0);
    setIsScanning(true);
    toast({
      title: "Fingerprint Scanning",
      description: "Please place your finger on the sensor and hold still.",
    });
  };

  const resetScan = () => {
    setScanStatus('idle');
    setScanProgress(0);
    setIsScanning(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
              scanStatus === 'scanning' ? 'bg-blue-100 animate-pulse' :
              scanStatus === 'success' ? 'bg-green-100' :
              scanStatus === 'failed' ? 'bg-red-100' :
              scanStatus === 'suspicious' ? 'bg-orange-100' :
              'bg-gray-100'
            }`}>
              <Fingerprint className={`w-10 h-10 ${
                scanStatus === 'scanning' ? 'text-blue-600 animate-pulse' :
                scanStatus === 'success' ? 'text-green-600' :
                scanStatus === 'failed' ? 'text-red-600' :
                scanStatus === 'suspicious' ? 'text-orange-600' :
                'text-gray-600'
              }`} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg">{studentName}</h3>
            <p className="text-sm text-gray-600">ID: {studentId}</p>
          </div>

          {scanStatus === 'scanning' && (
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <p className="text-sm text-blue-600">Scanning... {scanProgress}%</p>
            </div>
          )}

          <div className="flex justify-center">
            <Badge variant={
              scanStatus === 'success' ? 'default' :
              scanStatus === 'failed' ? 'destructive' :
              scanStatus === 'suspicious' ? 'destructive' :
              scanStatus === 'scanning' ? 'secondary' :
              'outline'
            } className={
              scanStatus === 'success' ? 'bg-green-100 text-green-800' :
              scanStatus === 'suspicious' ? 'bg-orange-100 text-orange-800' :
              ''
            }>
              {scanStatus === 'idle' && 'Ready to Scan'}
              {scanStatus === 'scanning' && 'Scanning...'}
              {scanStatus === 'success' && (
                <><CheckCircle className="w-3 h-3 mr-1" />Verified</>
              )}
              {scanStatus === 'failed' && (
                <><XCircle className="w-3 h-3 mr-1" />Failed</>
              )}
              {scanStatus === 'suspicious' && (
                <><AlertTriangle className="w-3 h-3 mr-1" />Suspicious</>
              )}
            </Badge>
          </div>

          <div className="flex space-x-2 pt-4">
            {scanStatus === 'idle' && (
              <Button onClick={startScan} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Fingerprint className="w-4 h-4 mr-2" />
                Start Scan
              </Button>
            )}
            
            {(scanStatus === 'failed' || scanStatus === 'suspicious') && (
              <Button onClick={resetScan} variant="outline" className="flex-1">
                Try Again
              </Button>
            )}
            
            <Button onClick={onCancel} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FingerprintScanner;
