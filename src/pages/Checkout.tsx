
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { QrCode, CreditCard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const UPI_METHODS = [
  { id: "gpay", name: "Google Pay", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" },
  { id: "phonepe", name: "PhonePe", logo: "https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png" },
  { id: "paytm", name: "Paytm", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" },
  { id: "bhim", name: "BHIM UPI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/BHIM_logo.svg/2560px-BHIM_logo.svg.png" },
  { id: "amazonpay", name: "Amazon Pay", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Amazon_Pay_logo.svg/1024px-Amazon_Pay_logo.svg.png" },
];

const Checkout = () => {
  const navigate = useNavigate();
  const [showQR, setShowQR] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<string>("card");
  const [upiMethod, setUpiMethod] = React.useState<string>("gpay");
  const { toast } = useToast();

  const handlePayment = () => {
    if (paymentMethod === "upi") {
      // Simulate UPI payment
      setTimeout(() => {
        setShowQR(true);
        toast({
          title: "Payment Successful",
          description: `Your payment with ${UPI_METHODS.find(m => m.id === upiMethod)?.name} was successful!`,
        });
      }, 1000);
      return;
    }

    // Regular Razorpay payment
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
              
              <div className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                      <CreditCard className="mr-2 h-5 w-5" />
                      <span>Credit/Debit Card</span>
                    </Label>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="cursor-pointer">UPI Payment</Label>
                    </div>
                    
                    {paymentMethod === "upi" && (
                      <div className="mt-3 ml-6 border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
                        <p className="text-sm mb-3 text-gray-600 dark:text-gray-300">Select UPI provider:</p>
                        <RadioGroup value={upiMethod} onValueChange={setUpiMethod} className="space-y-2">
                          {UPI_METHODS.map((method) => (
                            <div key={method.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                              <RadioGroupItem value={method.id} id={method.id} />
                              <Label htmlFor={method.id} className="flex items-center cursor-pointer">
                                <img src={method.logo} alt={method.name} className="w-6 h-6 mr-2 object-contain" />
                                <span>{method.name}</span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                </RadioGroup>
                
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
