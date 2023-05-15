import { type NextPage } from "next";

import Features from "@/components/Features";
import Working from "@/components/Working";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";



const Home: NextPage = () => {
  return (
    <>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <NavBar />
          <Hero />
        </div>
        <Features />
        <Working />
        
        <Footer />
      </div>
    </>
  );
};

export default Home;
