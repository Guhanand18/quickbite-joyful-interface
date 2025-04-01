
import React from 'react';
import QRCode from 'react-qr-code';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCheck } from 'lucide-react';

interface OrderQRCodeProps {
  open: boolean;
  onClose: () => void;
  orderId: string;
}

const OrderQRCode = ({ open, onClose, orderId }: OrderQRCodeProps) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Scan QR Code to Collect Order</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6">
          <div className="rounded-full bg-green-100 p-3 mb-4 animate-bounce">
            <CheckCheck className="h-8 w-8 text-green-600" />
          </div>
          <div className="bg-white p-4 rounded-md">
            <QRCode 
              value={`https://quickbite.app/verify/${orderId}`} 
              size={200} 
              level="H"
            />
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Show this QR code to the staff at the kiosk to collect your order
          </p>
          <div className="mt-2 mb-1 font-semibold text-center">Order ID:</div>
          <p className="font-bold text-lg bg-gray-100 px-4 py-2 rounded-lg">{orderId}</p>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="w-full">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderQRCode;
