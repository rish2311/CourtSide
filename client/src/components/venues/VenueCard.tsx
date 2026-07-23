import type { Venue } from "@/types/venue";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

interface VenueCardProps {
  venue: Venue;
  onClick?: () => void;
}

export const VenueCard = ({ venue, onClick }: VenueCardProps) => {
  return (
    <article
      className={cn(
        "bg-surface-bright rounded-xl border border-outline-variant/50 overflow-hidden group cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-secondary",
        venue.isFullyBooked && "opacity-70"
      )}
      onClick={onClick}
    >
      <div className="h-48 relative overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url('${venue.images[0] || ""}')` }}
        />

        <div className="absolute top-sm right-sm bg-surface/90 backdrop-blur-sm px-xs py-1 rounded font-label-sm text-label-sm text-primary flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-secondary">star</span>
          {venue.rating}
        </div>

        {venue.tags?.map((tag) => (
          <div key={tag} className="absolute bottom-sm left-sm">
            <Badge variant="primary">
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              {tag}
            </Badge>
          </div>
        ))}

        {venue.isFullyBooked && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-on-surface/10">
            <span className="bg-inverse-surface/80 text-inverse-on-surface px-md py-sm rounded-full font-label-md text-label-md backdrop-blur-md">
              Fully Booked Today
            </span>
          </div>
        )}
      </div>

      <div className="p-md">
        <div className="flex justify-between items-start mb-xs">
          <h3 className="text-headline-lg text-on-surface m-0 leading-tight">{venue.name}</h3>
          <span className="text-label-md text-on-surface-variant">${venue.pricePerHour}/hr</span>
        </div>

        <p className="text-body-md text-on-surface-variant mb-sm">
          {venue.sport} • {venue.location.city}
        </p>

        <div className="flex justify-between items-center border-t border-outline-variant/30 pt-sm mt-sm">
          <span className="text-label-sm text-outline flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            {venue.distance ? `${venue.distance} mi away` : venue.location.address}
          </span>
          <button className="text-primary font-label-md text-label-md hover:text-secondary transition-colors underline underline-offset-4">
            {venue.isFullyBooked ? "Next Available: Tmrw" : "View Availability"}
          </button>
        </div>
      </div>
    </article>
  );
};
