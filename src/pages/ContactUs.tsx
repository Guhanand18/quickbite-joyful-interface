
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, MessageSquare } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUs = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Contact Us
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-primary/5 p-6 rounded-lg">
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-300">
                support@quickbite.in
              </p>
            </div>
            
            <div className="bg-primary/5 p-6 rounded-lg">
              <MessageSquare className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Live Chat</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Available 24/7
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-white">Name</label>
                  <Input required placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-white">Email</label>
                  <Input required type="email" placeholder="Your email" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-white">Subject</label>
                <Input required placeholder="How can we help?" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-white">Message</label>
                <Textarea
                  required
                  placeholder="Tell us more about your inquiry..."
                  className="min-h-[150px]"
                />
              </div>
              
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
