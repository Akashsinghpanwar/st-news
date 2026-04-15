import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Products from "./components/Products";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="noise-overlay" />
      <Navigation />
      <Hero />
      <Features />
      <Products />
      <Reviews />
      <Location />
      <Footer />
    </>
  );
}

export default App;
