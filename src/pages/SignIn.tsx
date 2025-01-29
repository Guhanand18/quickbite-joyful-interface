import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle, FaApple } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="font-playfair text-3xl font-bold text-center mb-8 dark:text-white">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input
                type="text"
                placeholder="Username"
                className="w-full dark:bg-gray-700 dark:text-white"
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              className="w-full dark:bg-gray-700 dark:text-white"
            />
            {isSignUp && (
              <Input
                type="tel"
                placeholder="Phone Number"
                className="w-full dark:bg-gray-700 dark:text-white"
              />
            )}
            <Input
              type="password"
              placeholder="Password"
              className="w-full dark:bg-gray-700 dark:text-white"
            />
            <Button className="w-full bg-primary hover:bg-primary/90">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full dark:text-white dark:hover:bg-gray-700"
              >
                <FaGoogle className="mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full dark:text-white dark:hover:bg-gray-700"
              >
                <FaApple className="mr-2" />
                Apple
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-accent hover:underline dark:text-accent"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;