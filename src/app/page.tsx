import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Shop from "@/components/Shop";


import Contact from "@/components/Contact";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Shop />

     
      <Contact />
      <Footer/>
    </main>
  );
}