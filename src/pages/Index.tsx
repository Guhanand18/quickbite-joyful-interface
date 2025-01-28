import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import PopularMeals from "../components/PopularMeals";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <PopularMeals />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;