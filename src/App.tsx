import { useState } from "react";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Features from "./Components/Features/Features";
import Footer from "./Components/Footer/Footer";
import HeroSection from "./Components/Hero/HeroSection";
import Navbar from "./Components/Navbar/Navbar";
import Story from "./Components/Story/Story";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);

  return (
    <>
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <main className="relative min-h-screen overflow-x-hidden w-screen">
        <Navbar />
        <HeroSection setIsLoading={setIsLoading} isLoading={isLoading} />
        <About />
        <Features />
        <Story />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default App;
