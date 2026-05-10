"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Image from "next/image";
import navigationData from "@/data/navigation.json";
import Button from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleOpenModal = () => setIsModalOpen(true);
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("open-join-modal", handleOpenModal);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("open-join-modal", handleOpenModal);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-brand-background/90 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo_cis_uni_horizontal_white.svg"
                  alt="IEEE CIS UNI Logo"
                  width={180}
                  height={45}
                  className="h-8 md:h-12 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navigationData.navbar.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="relative text-white/70 hover:text-white transition-colors text-sm font-medium group py-1"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
                <Button 
                  onClick={() => setIsModalOpen(true)} 
                  size="sm" 
                  className="font-normal"
                >
                  Únete
                </Button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 focus:outline-none"
              >
                {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden absolute w-full bg-brand-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 space-y-4">
            {navigationData.navbar.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="block text-white/90 hover:text-brand-accent text-lg font-medium py-2 border-b border-white/10"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Button 
                onClick={() => {
                  setIsOpen(false);
                  setIsModalOpen(true);
                }} 
                className="w-full py-4 font-normal"
              >
                Únete
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Under Construction Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-background/60 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: 20 }}
              className="relative w-full max-w-md bg-brand-background border border-white/10 rounded-[2.5rem] p-1 md:p-1 overflow-hidden shadow-[0_0_50px_rgba(6,107,243,0.15)]"
            >
              {/* Inner Container with Grid Background */}
              <div className="relative bg-brand-secondary/5 rounded-[2.4rem] p-8 md:p-12 overflow-hidden">
                {/* Decorative Grid */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #066bf3 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                
                {/* Tech Corners */}
                <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-brand-accent/40 rounded-tr-lg" />
                <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-brand-accent/40 rounded-bl-lg" />

                <div className="relative z-10 text-center">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter leading-tight">
                    Esta sección aún está en <br/> <span className="text-brand-accent">desarrollo</span>
                  </h3>
                  
                  <p className="text-white/60 text-lg md:text-xl font-medium mb-10 tracking-wide">
                    Disponible próximamente
                  </p>

                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="group relative px-12 py-4 bg-brand-accent rounded-xl text-white font-black uppercase tracking-widest transition-all hover:bg-brand-accent/90 hover:scale-105 overflow-hidden"
                  >
                    <span className="relative z-10 text-sm">Entendido</span>
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
