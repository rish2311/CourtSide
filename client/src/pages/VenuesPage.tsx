import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VenueCard } from "@/components/venues/VenueCard";
import { VenueFilterBar } from "@/components/venues/VenueFilterBar";
import { VenueMap } from "@/components/venues/VenueMap";
import type { Venue } from "@/types/venue";
import { listVenues } from "@/services/venues";

const VenuesPage = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSport, setActiveSport] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listVenues()
      .then((res) => setVenues(res.data.venues))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredVenues = venues.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = !activeSport || v.location.city === activeSport;
    return matchesSearch && matchesSport;
  });

  return (
    <div className="flex h-screen pt-[73px]">
      <section className="w-full lg:w-[40%] h-full bg-surface border-r border-outline-variant/30 flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <VenueFilterBar
          onSearch={setSearchQuery}
          activeSport={activeSport}
          onSportChange={setActiveSport}
        />

        <div className="flex-1 overflow-y-auto p-md space-y-md custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center h-full text-outline text-label-md">
              Loading venues...
            </div>
          ) : (
            filteredVenues.map((venue) => (
              <VenueCard
                key={venue._id}
                venue={venue}
                onClick={() => navigate(`/venue/${venue._id}`)}
              />
            ))
          )}
        </div>
      </section>

      <section className="hidden lg:block w-[60%] h-full relative">
        <VenueMap
          venues={filteredVenues}
          onVenueClick={(id) => navigate(`/venue/${id}`)}
        />
      </section>
    </div>
  );
};

export default VenuesPage;
