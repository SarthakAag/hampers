import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Shop from "@/components/Shop";

import Contact from "@/components/Contact";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Shop />
     
      <Contact />
    </main>
  );
}