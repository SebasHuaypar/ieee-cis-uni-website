"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiLocationMarker, HiPaperAirplane, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { sendContactEmail } from "@/app/actions/contact";

const ContactSection = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Ocurrió un error al enviar el mensaje.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Error de conexión. Inténtalo de nuevo.");
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-brand-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          
          {/* Left Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase">
              Envíanos un <span className="text-brand-accent">Mensaje</span>
            </h2>
            
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-accent/5 border border-brand-accent/20 p-12 rounded-[3rem] text-center"
              >
                <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiCheckCircle className="text-brand-accent text-5xl" />
                </div>
                <h3 className="text-white text-3xl font-black mb-4 tracking-tighter">¡MENSAJE ENVIADO!</h3>
                <p className="text-white/60 mb-10 text-lg leading-relaxed">
                  Gracias por contactarnos. Tu consulta ha sido procesada y nuestro equipo te responderá pronto.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest ml-4">Nombre Completo</label>
                    <input 
                      name="nombre"
                      type="text" 
                      required
                      placeholder="Tu nombre"
                      className="w-full bg-brand-secondary/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent/50 focus:bg-brand-secondary/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest ml-4">Correo Electrónico</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      placeholder="correo@ejemplo.com"
                      className="w-full bg-brand-secondary/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent/50 focus:bg-brand-secondary/10 transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest ml-4">Asunto</label>
                  <input 
                    name="asunto"
                    type="text" 
                    required
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full bg-brand-secondary/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent/50 focus:bg-brand-secondary/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest ml-4">Tu Mensaje</label>
                  <textarea 
                    name="mensaje"
                    rows={5}
                    required
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full bg-brand-secondary/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent/50 focus:bg-brand-secondary/10 transition-all resize-none"
                  />
                </div>

                {status === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-500 text-sm ml-4 bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                  >
                    <HiExclamationCircle />
                    {errorMessage}
                  </motion.div>
                )}

                <button 
                  disabled={status === "sending"}
                  className="group relative w-full py-5 bg-brand-accent rounded-2xl text-white font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-brand-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "sending" ? "Enviando..." : "Enviar Mensaje"}
                    {status !== "sending" && <HiPaperAirplane className="rotate-90 transition-transform group-hover:translate-x-2" />}
                  </span>
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Side: Contact Info & Hubs */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase">
                  Información de <span className="text-brand-accent">Contacto</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {/* Email Card */}
                  <div className="flex items-center gap-6 p-6 rounded-3xl bg-brand-secondary/5 border border-white/5 hover:border-brand-accent/30 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                      <HiMail size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Email Principal</p>
                      <p className="text-white font-bold">ieee.cis@uni.edu.pe</p>
                    </div>
                  </div>

                  {/* Location Card */}
                  <div className="flex items-center gap-6 p-6 rounded-3xl bg-brand-secondary/5 border border-white/5 hover:border-brand-accent/30 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                      <HiLocationMarker size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Ubicación</p>
                      <p className="text-white font-bold">Universidad Nacional de Ingeniería</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div>
                <h3 className="text-sm font-black text-white/30 mb-6 uppercase tracking-[0.3em]">Síguenos en</h3>
                <div className="flex gap-4">
                  {[
                    { icon: <FaLinkedin />, name: "LinkedIn", link: process.env.NEXT_PUBLIC_LINKEDIN_URL },
                    { icon: <FaInstagram />, name: "Instagram", link: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
                    { icon: <FaFacebook />, name: "Facebook", link: process.env.NEXT_PUBLIC_FACEBOOK_URL }
                  ].map((social, idx) => (
                    <a 
                      key={idx}
                      href={social.link || "#"}
                      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-accent hover:border-brand-accent/50 hover:bg-brand-accent/5 transition-all text-2xl"
                      title={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
