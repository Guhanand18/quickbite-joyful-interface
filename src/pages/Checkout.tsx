import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { QrCode, CreditCard, CreditCard as Bank, Wallet, ChevronLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import OrderQRCode from '@/components/OrderQRCode';

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

const NETBANKING_BANKS = [
  { id: "hdfc", name: "HDFC Bank" },
  { id: "sbi", name: "State Bank of India" },
  { id: "icici", name: "ICICI Bank" },
  { id: "axis", name: "Axis Bank" },
  { id: "kotak", name: "Kotak Mahindra Bank" },
];

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showQR, setShowQR] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [upiMethod, setUpiMethod] = useState<string>("gpay");
  const [netBankingOption, setNetBankingOption] = useState<string>("hdfc");
  const [orderId, setOrderId] = useState<string>("");
  const { toast } = useToast();

  const handlePayment = () => {
    // Generate a random order ID
    const newOrderId = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    setOrderId(newOrderId);

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

    if (paymentMethod === "netbanking") {
      // Simulate Netbanking payment
      setTimeout(() => {
        setShowQR(true);
        toast({
          title: "Payment Successful",
          description: `Your payment with ${NETBANKING_BANKS.find(b => b.id === netBankingOption)?.name} was successful!`,
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
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

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
                      <Label htmlFor="upi" className="cursor-pointer flex items-center">
                        <Wallet className="mr-2 h-5 w-5" />
                        UPI Payment
                      </Label>
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

                  <div>
                    <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="cursor-pointer flex items-center">
                        <Bank className="mr-2 h-5 w-5" />
                        Net Banking
                      </Label>
                    </div>
                    
                    {paymentMethod === "netbanking" && (
                      <div className="mt-3 ml-6 border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
                        <p className="text-sm mb-3 text-gray-600 dark:text-gray-300">Select your bank:</p>
                        <RadioGroup value={netBankingOption} onValueChange={setNetBankingOption} className="space-y-2">
                          {NETBANKING_BANKS.map((bank) => (
                            <div key={bank.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                              <RadioGroupItem value={bank.id} id={bank.id} />
                              <Label htmlFor={bank.id} className="cursor-pointer">
                                {bank.name}
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center animate-scale-in">
              <OrderQRCode 
                onClose={() => navigate("/")} 
                orderId={orderId} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
