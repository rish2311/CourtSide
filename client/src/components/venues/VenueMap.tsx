import type { Venue } from '@/types/venue';

interface VenueMapProps {
  venues: Venue[];
  onVenueClick: (venueId: string) => void;
}

export const VenueMap = ({ venues, onVenueClick }: VenueMapProps) => {
  return (
    <div className="relative w-full h-full bg-surface-container-low overflow-hidden">
      {/* Simulated Map Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGG1RhlTaJ1bBa3teeSV78PS560S4i4dUkSyQAxAj0214-HycuEOeKQBaS232D414TeFkJRP2QfCF7Pw3yCFmPZgXRvWUsFzryIT1BC5H4G7noJb4p_wNVENs_qYK0mxMBDe8fhdF9oM37MFUT-goOrxdTvgbFr3GrYe_r7mHW3dH9-B6qk3IiigfrfXUbU3kiyLr2OUNlLh6h97fcPG4XbFijNI8iTNgiM_T6hxo2PhxQX8WNUdVVLf6kKFRsNxFH48ojOer_pqPp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Depth Overlay */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_24px_0_24px_-12px_rgba(0,0,0,0.05)]" />

      {/* Venue Pins */}
      {venues.map((venue) => (
        <div
          key={venue._id}
          className="absolute group cursor-pointer z-10 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${venue.simulatedCoords?.x || 50}%`,
            top: `${venue.simulatedCoords?.y || 50}%`,
          }}
          onClick={() => onVenueClick(venue._id)}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute w-8 h-8 bg-secondary/20 rounded-full animate-ping" />
            <div className="w-sm h-sm bg-primary rounded-full border-2 border-white shadow-md z-10 group-hover:scale-125 transition-transform" />

            {/* Tooltip */}
            <div className="absolute bottom-full mb-xs opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-inverse-on-surface px-sm py-xs rounded font-label-sm text-label-sm whitespace-nowrap shadow-lg pointer-events-none">
              {venue.name} - ${venue.pricePerHour}/hr
            </div>
          </div>
        </div>
      ))}

      {/* Map Controls */}
      <div className="absolute right-md bottom-lg flex flex-col gap-sm">
        <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-lg border border-outline-variant/30 shadow-sm flex items-center justify-center text-on-surface hover:text-primary transition-colors hover:border-primary/50">
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
        <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-lg border border-outline-variant/30 shadow-sm flex items-center justify-center text-on-surface hover:text-primary transition-colors hover:border-primary/50">
          <span className="material-symbols-outlined text-[20px]">remove</span>
        </button>
        <button className="w-10 h-10 mt-sm bg-white/90 backdrop-blur rounded-lg border border-outline-variant/30 shadow-sm flex items-center justify-center text-on-surface hover:text-primary transition-colors hover:border-primary/50">
          <span className="material-symbols-outlined text-[20px]">my_location</span>
        </button>
      </div>
    </div>
  );
};
