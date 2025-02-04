import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { QrCode } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const [showQR, setShowQR] = React.useState(false);

  const handlePayment = () => {
    // In a real app, handle payment processing here
    setShowQR(true);
  };

  return (
    <div className="min-h-screen bg-neutral dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-playfair text-3xl font-bold mb-8 dark:text-white">Checkout</h1>
          
          {!showQR ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Payment Options</h2>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                  <h3 className="font-semibold dark:text-white">UPI Payment</h3>
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    <img src="/gpay.png" alt="Google Pay" className="h-12 object-contain" />
                    <img src="/phonepe.png" alt="PhonePe" className="h-12 object-contain" />
                    <img src="/paytm.png" alt="Paytm" className="h-12 object-contain" />
                    <img src="/bhim.png" alt="BHIM" className="h-12 object-contain" />
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handlePayment}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <QrCode className="w-48 h-48 mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Order QR Code</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Scan this QR code at the kiosk to collect your order
              </p>
              <Button variant="outline" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;