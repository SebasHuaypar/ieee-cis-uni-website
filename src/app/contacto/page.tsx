import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";

export const metadata = {
  title: "Contacto | IEEE CIS UNI",
  description: "Ponte en contacto con el capítulo estudiantil IEEE CIS de la Universidad Nacional de Ingeniería. Estamos listos para colaborar y responder tus dudas.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-background">
      <ContactHero />
      <ContactSection />
    </main>
  );
}
