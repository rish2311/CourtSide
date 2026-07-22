import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VenueCard } from "@/components/venues/VenueCard";
import { VenueFilterBar } from "@/components/venues/VenueFilterBar";
import { VenueMap } from "@/components/venues/VenueMap";
import type { Venue } from "@/types/venue";

const mockVenues: Venue[] = [
  {
    _id: "1",
    name: "The Emerald Club",
    description: "Premium hard court facility",
    sport: "Tennis",
    owner: "owner1",
    location: { address: "123 Main St", city: "London", state: "UK", pincode: "SW1" },
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-bEP_eM2kKz0lVvbtGtYFad1sE8twhnpKJfoexE7NFkHPnRji70hA_7Prnur8KMGcsble1WkKu_lqLXiRctlct3Eu9WwJsSLRoF4EYj3ucJIw7E7XGHwc_5nMk30OTT3kEGtt0_gt_wJuunyhZzPIeWl4r9q_vSF6VnePTCIbjuMrKZbkkbay7wLgcLRZDdz8Qd49EnMkT71-E-1fLdsYemvMKH2blr7xbYi_kjN-uDNKoYyzHf4rZKzSBzXOCnh1DBHb5iVKirhH",
    ],
    pricePerHour: 45,
    amenities: [],
    openTime: "06:00",
    closeTime: "22:00",
    rating: 4.9,
    totalReviews: 128,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    distance: 1.2,
    tags: ["Fast-Track"],
    simulatedCoords: { x: 40, y: 30 },
  },
  {
    _id: "2",
    name: "Downtown Athletics",
    description: "Red clay indoor courts",
    sport: "Tennis",
    owner: "owner2",
    location: { address: "456 Oak Ave", city: "London", state: "UK", pincode: "EC2" },
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAeHCt-9C4rIoBGgwr1lt2LDuW2aW_kZAy5nzkwR5PSoWLNtg-08CQueJBonQchuqKG5DVGqDK0iVVczLAIl5IE0pIhMEGeZ7F_QWsj2OXBQSJhM1Pj_EeonadF2LgkQy5kzOQzqZEbDcI7r49EyPJIGwvgdRriyMC0Xn-s_lrXu_MOSUl0r6Wh-b1-t0HJ_Zl-ODlAiOA84qsikWJMu9s4aZfAOD72GzD2QPR8QZS1TY_tzKdJt_At3HfLmDvULcLvEZLuUXYcp1XR",
    ],
    pricePerHour: 60,
    amenities: [],
    openTime: "07:00",
    closeTime: "23:00",
    rating: 4.8,
    totalReviews: 95,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    distance: 2.5,
    simulatedCoords: { x: 60, y: 50 },
  },
  {
    _id: "3",
    name: "Heritage Grass Courts",
    description: "Prestigious grass courts",
    sport: "Tennis",
    owner: "owner3",
    location: { address: "789 Park Ln", city: "London", state: "UK", pincode: "W1" },
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIs4d5c4bD9ZhqY1jrao5VVsir1GiwMmODOijthk2YRibknivyDy6g5ZyhDp8QHr6ESAie5lc4FTGTd_4QZf_TPUVRaW5Z7KgM23b2tiEjMyZthAl4et9E4z0oglWsmRisWIJx-P4alO9R_xfHYL-yphXS6YXQq050CKs-ftWi_AA40vrV2vIEcyqZq2YqMsTh2XNj7fmss-W3JVDUvS1GiSx_MtOmqpxWqfjLvh2QXYeUiIjtVocCNSiXWW58iucx8msmL9-rfLTF",
    ],
    pricePerHour: 85,
    amenities: [],
    openTime: "08:00",
    closeTime: "20:00",
    rating: 5.0,
    totalReviews: 67,
    isActive: true,
    isFullyBooked: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    distance: 4.0,
    simulatedCoords: { x: 70, y: 20 },
  },
];

const VenuesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSport, setActiveSport] = useState("");

  const filteredVenues = mockVenues.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = !activeSport || v.sport === activeSport;
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
          {filteredVenues.map((venue) => (
            <VenueCard
              key={venue._id}
              venue={venue}
              onClick={() => navigate(`/venue/${venue._id}`)}
            />
          ))}
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
