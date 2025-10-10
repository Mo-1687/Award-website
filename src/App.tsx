import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Features from "./Components/Features/Features";
import Footer from "./Components/Footer/Footer";
import HeroSection from "./Components/Hero/HeroSection";
import Navbar from "./Components/Navbar/Navbar";
import Story from "./Components/Story/Story";

const App = () => {

  return (
    <>
      
      <main className="relative min-h-screen overflow-x-hidden w-screen">
        <Navbar />
        <HeroSection  />
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
