import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { QrCode } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const navigate = useNavigate();
  const [showQR, setShowQR] = React.useState(false);
  const { toast } = useToast();

  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: 50000, // Amount in paise (₹500)
      currency: "INR",
      name: "QuickBite",
      description: "Food Order Payment",
      handler: function (response: any) {
        console.log(response);
        if (response.razorpay_payment_id) {
          setShowQR(true);
          toast({
            title: "Payment Successful",
            description: "Your order has been confirmed!",
          });
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#28a745"
      }
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
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
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold dark:text-white">Secure Payment with Razorpay</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Pay securely using UPI, Credit/Debit cards, or Net Banking
                  </p>
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