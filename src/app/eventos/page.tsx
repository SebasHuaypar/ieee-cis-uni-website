import EventHero from "@/components/events/EventHero";
import EventList from "@/components/events/EventList";

export const metadata = {
  title: "Eventos | IEEE CIS UNI",
  description: "Participa en nuestros próximos workshops, conferencias y competencias. Sé parte de la comunidad de Inteligencia Computacional de la UNI.",
};

export default function EventosPage() {
  return (
    <main className="min-h-screen bg-brand-background">
      <EventHero />
      <EventList />
    </main>
  );
}
