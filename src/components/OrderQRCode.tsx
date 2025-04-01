
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Check, Download } from "lucide-react";
import confetti from "canvas-confetti";

interface OrderQRCodeProps {
  orderId: string;
  orderDetails?: {
    items: string[];
    total: number;
    pickupTime?: string;
    kioskLocation?: string;
  };
  animateOnMount?: boolean;
}

const OrderQRCode = ({ orderId, orderDetails, animateOnMount = false }: OrderQRCodeProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    // Create QR value from order ID and details
    const qrData = {
      orderId,
      items: orderDetails?.items || [],
      total: orderDetails?.total || 0,
      pickupTime: orderDetails?.pickupTime || "",
      kioskLocation: orderDetails?.kioskLocation || ""
    };
    
    setQrValue(JSON.stringify(qrData));
    
    // If animation is enabled, show confetti
    if (animateOnMount) {
      setTimeout(() => {
        setShowConfetti(true);
      }, 500);
    }
  }, [orderId, orderDetails, animateOnMount]);

  useEffect(() => {
    if (showConfetti) {
      // Run the confetti effect
      const duration = 3000;
      const end = Date.now() + duration;

      const runConfetti = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0000', '#00ff00', '#0000ff']
        });
        
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0000', '#00ff00', '#0000ff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(runConfetti);
        }
      };

      runConfetti();
    }
  }, [showConfetti]);

  const handleDownload = () => {
    const svg = document.getElementById("order-qr-code");
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      
      // Download the PNG
      const downloadLink = document.createElement("a");
      downloadLink.download = `order-${orderId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      setDownloaded(true);
      
      setTimeout(() => {
        setDownloaded(false);
      }, 3000);
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <Card className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">Your Order QR Code</CardTitle>
        <CardDescription>
          Show this QR code at the kiosk to pick up your order
        </CardDescription>
        <div className="mt-2 py-1 px-3 bg-primary/10 text-primary rounded-full text-sm inline-block">
          Order ID: {orderId}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-6">
        <div className="bg-white p-4 rounded-lg mb-4 shadow-sm">
          <QRCode
            id="order-qr-code"
            value={qrValue}
            size={200}
            level="H"
            fgColor="#000000"
            className="max-w-full h-auto"
          />
        </div>
        
        {orderDetails && (
          <div className="w-full text-center space-y-1 mt-2">
            {orderDetails.pickupTime && (
              <p className="text-sm font-medium">Pickup time: {orderDetails.pickupTime}</p>
            )}
            {orderDetails.kioskLocation && (
              <p className="text-sm font-medium">Location: {orderDetails.kioskLocation}</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button
          onClick={handleDownload}
          className="transition-all duration-200 transform hover:scale-105"
          variant={downloaded ? "active" : "default"}
        >
          {downloaded ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Downloaded
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" /> Download QR Code
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderQRCode;
