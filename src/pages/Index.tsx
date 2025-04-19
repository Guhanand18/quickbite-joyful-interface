
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import UserReviews from "../components/UserReviews";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <UserReviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
