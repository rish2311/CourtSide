interface VenueFilterBarProps {
  onSearch: (query: string) => void;
  activeSport: string;
  onSportChange: (sport: string) => void;
}

export const VenueFilterBar = ({ onSearch, activeSport, onSportChange }: VenueFilterBarProps) => {
  const filters = [
    { id: "sport", label: "Sport" },
    { id: "surface", label: "Surface" },
    { id: "time", label: "Time" },
  ];

  return (
    <div className="sticky top-0 z-20 px-md py-md bg-white/80 backdrop-blur-md border-b border-outline-variant/30">
      <div className="relative">
        <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
        <input
          className="w-full pl-lg pr-md py-sm bg-surface-bright border border-outline-variant rounded-lg font-label-md text-on-surface focus:ring-2 focus:ring-secondary focus:border-transparent transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] outline-none placeholder:text-outline/70"
          placeholder="Search courts or clubs..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-sm mt-sm overflow-x-auto pb-xs scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`whitespace-nowrap px-sm py-xs rounded-full border font-label-sm text-label-sm flex items-center gap-xs transition-colors ${
              filter.id === "sport" && activeSport
                ? "border-secondary text-primary bg-secondary-container/20 hover:bg-secondary-container/40"
                : "border-outline-variant text-on-surface-variant bg-surface hover:border-outline"
            }`}
            onClick={() => filter.id === "sport" && onSportChange(activeSport ? "" : "Tennis")}
          >
            {filter.label}
            <span className="material-symbols-outlined text-[14px]">keyboard_arrow_down</span>
          </button>
        ))}
      </div>
    </div>
  );
};
