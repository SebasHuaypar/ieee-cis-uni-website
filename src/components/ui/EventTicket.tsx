import { HiClock, HiLocationMarker, HiUser } from "react-icons/hi";
import Button from "@/components/ui/Button";

interface EventTicketProps {
  date: string; // Formatted date string like "24 de Mayo, 2026"
  title: string;
  time: string;
  location: string;
  speaker?: string;
  category: string;
  link: string;
  status?: string;
}

const EventTicket = ({ date, title, time, location, speaker, category, link, status }: EventTicketProps) => {
  // Extract day and month for the stub
  // Assuming date format "24 de Mayo, 2026" or similar
  const dateParts = date.split(' ');
  const day = dateParts[0] || "00";
  const month = (dateParts[2] || "MES").substring(0, 3).toUpperCase();

  return (
    <div className="group relative flex flex-col md:flex-row bg-brand-secondary/15 rounded-xl overflow-hidden hover:bg-brand-secondary/20 transition-all duration-500">
      
      {/* Date Stub */}
      <div className="bg-brand-accent/20 flex md:flex-col items-center justify-center py-3 md:py-10 md:w-28 relative">
        <div className="flex md:flex-col items-center gap-2 md:gap-0">
          <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest">{month}</span>
          <span className="text-white text-3xl md:text-4xl font-black">{day}</span>
        </div>
      </div>

      {/* Perforated Line & Cutouts */}
      <div className="relative">
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px border-l border-dashed border-white/30 z-10">
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-brand-background rounded-full" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-brand-background rounded-full" />
        </div>
        
        <div className="md:hidden w-full h-px border-t border-dashed border-white/20 relative">
          <div className="absolute -left-3 -top-3 w-6 h-6 bg-brand-background rounded-full" />
          <div className="absolute -right-3 -top-3 w-6 h-6 bg-brand-background rounded-full" />
        </div>
      </div>

      {/* Details Section */}
      <div className="flex-grow p-6 lg:py-8 lg:px-10 relative">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <div className="flex flex-col items-center md:items-start gap-3 w-full">
            <div className="flex justify-between items-center w-full">
              <span className="px-2 py-0.5 bg-brand-accent/20 text-brand-accent text-[9px] font-bold uppercase tracking-wider rounded">
                {category}
              </span>
              {status && (
                <span className={`text-[9px] font-bold uppercase tracking-widest ${status === 'Past' ? 'text-white/30' : 'text-green-500'}`}>
                  {status === 'Past' ? 'Finalizado' : 'Próximamente'}
                </span>
              )}
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/50 text-[10px] md:text-[11px]">
              <span className="flex items-center"><HiClock className="mr-1 text-brand-accent" />{time}</span>
              <span className="flex items-center"><HiLocationMarker className="mr-1 text-brand-accent" />{location}</span>
              {speaker && <span className="flex items-center"><HiUser className="mr-1 text-brand-accent" />{speaker}</span>}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
            <h4 className="text-lg lg:text-xl font-bold text-white group-hover:text-brand-accent transition-colors leading-tight max-w-xl">
              {title}
            </h4>
            <div className="flex-shrink-0">
              <Button href={link} variant={status === 'Past' ? 'outline' : 'primary'} size="sm" className="w-fit">
                {status === 'Past' ? 'Ver Detalles' : 'Registrarme'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTicket;
