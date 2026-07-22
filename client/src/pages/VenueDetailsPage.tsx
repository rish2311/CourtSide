import { useState } from "react";
import { Link } from "react-router-dom";

const timeSlots = [
  { time: "08:00 AM", court: "Center Court (Indoor)", available: false },
  { time: "09:00 AM", court: "Center Court (Indoor)", available: true },
  { time: "10:00 AM", court: "Center Court (Indoor)", available: true },
  { time: "11:00 AM", court: "Center Court (Indoor)", available: true },
  { time: "08:00 AM", court: "Court 2 (Clay)", available: true },
  { time: "09:00 AM", court: "Court 2 (Clay)", available: true },
];

const days = Array.from({ length: 28 }, (_, i) => i + 1);

const VenueDetailsPage = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(14);
  const [selectedSlot, setSelectedSlot] = useState<string | null>("10:00 AM");
  const [selectedCourt, setSelectedCourt] = useState("Center Court (Indoor)");

  return (
    <div className="pt-[100px] pb-xl px-md md:px-xl mx-auto max-w-container-max w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      <div className="col-span-1 lg:col-span-8 space-y-xl">
        <section className="space-y-sm">
          <div className="flex items-center space-x-2 text-outline text-label-sm uppercase tracking-wider mb-sm">
            <Link to="/venues" className="hover:text-primary transition-colors">
              Venues
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <Link to="/venues" className="hover:text-primary transition-colors">
              London
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-primary font-semibold">The Wimbledon Social</span>
          </div>

          <h1 className="text-display-lg-mobile md:text-display-lg text-primary mb-md">
            The Wimbledon Social
          </h1>

          <div className="grid grid-cols-4 grid-rows-2 gap-sm h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-sm border border-outline-variant/30">
            <div
              className="col-span-4 md:col-span-3 row-span-2 relative group overflow-hidden bg-cover bg-center transition-transform duration-700 hover:scale-[1.02]"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZOvXFcw5-wWsoE92wShcCcWf27WppmqeKNOawXc-x3br--JwxOU75WVmjZM-PpGzOt4y-qeasO6T2vKBASwl99UzsBfD0xKPBf-9mRvqs0W0Xhm9RjTTEUWpTIZNiumB8c8lKktUEjm-FzpRbA7vVpWmACYCq4hhABA3p89lMTjgzxsdqxvE-IUY6epXDhcXQQg1xj2GGk8U5m-7eYT2NH406-TQtyKoCjaJvuNcx8ifKU4wfUk-vH7kzzUDS5m-IBCU8S1EsnzuI')",
              }}
            />
            <div
              className="hidden md:block col-span-1 row-span-1 relative group overflow-hidden bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCfVA2bOiihAf2REbudncFLSLohHUa5Z5vIx5fRncdsiDhsjSjXnVfjCbah3pigb0OGiozgS9mCfIhgKLzr57E4ZTAswTI0LS1n91dYDiOdJtYlZqplBJTH_jcKCU34I2r176LdVyzG3OPhYnIKFVrDm0DUiNeWjixFhclqt_czLzK1tqI39fTHwHAoSmOBrpapaGw_NXIsY7myBb1n1PHnYfjyKr-6-8fYnC8NPk2ZFxFblDYCDpp8PA6a4jBBK93b3qo4DapFiXEP')",
              }}
            />
            <div
              className="hidden md:block col-span-1 row-span-1 relative group overflow-hidden bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6g3mEgtuFwWNOjtWCrS60mdVlXanyynehGOcXImfSjlX_1Myt2Ksk6SAs1MXsS7GVrn7qsac88g4vlpupA_Pa_KHci52LMhm8hLXj6Ij2x6lBk_b4OckFW9yhr79vuWzBKpYbE7e5FicalEVV7mmj-Ij35GiU64WNBSCRsgyc3thgHKo9FxNEnSoEhjfTXyzoSYPXcbl6HAMpIFLvzEAPfi7u6_mPljDqZGvPe3cq9MtJWZe9gIgTRIRe5I26kBBtJrxyLewtk9CZ')",
              }}
            >
              <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                <span className="text-white font-label-md flex items-center">
                  <span className="material-symbols-outlined mr-2">grid_view</span>
                  View All
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-lg">
          <h2 className="text-headline-xl text-primary border-b border-outline-variant/30 pb-sm">
            Select Date & Time
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="bg-white p-md rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/30">
              <div className="flex justify-between items-center mb-md">
                <h3 className="text-headline-lg text-on-surface">October 2024</h3>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:text-primary hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:text-primary hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-xs text-center text-label-sm text-outline mb-2">
                <div>MO</div>
                <div>TU</div>
                <div>WE</div>
                <div>TH</div>
                <div>FR</div>
                <div>SA</div>
                <div>SU</div>
              </div>

              <div className="grid grid-cols-7 gap-xs text-center">
                <div className="h-10" />
                <div className="h-10" />
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`h-10 w-10 mx-auto flex items-center justify-center rounded-full transition-colors text-label-md ${
                      selectedDay === day
                        ? "bg-primary text-on-primary shadow-md"
                        : "hover:bg-surface-container-high text-on-surface"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-md rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/30 overflow-y-auto max-h-[500px]">
              <h3 className="text-headline-lg text-on-surface mb-md sticky top-0 bg-white pb-2 border-b border-surface-variant z-10">
                Available Courts
              </h3>

              <div className="space-y-4">
                {Array.from(new Set(timeSlots.map((s) => s.court))).map((court) => (
                  <div key={court}>
                    <h4 className="text-label-md text-outline mb-2 flex items-center">
                      <span className="material-symbols-outlined text-sm mr-1">sports_tennis</span>
                      {court}
                    </h4>
                    <div className="grid grid-cols-2 gap-sm">
                      {timeSlots
                        .filter((s) => s.court === court)
                        .map((slot) => (
                          <button
                            key={`${slot.court}-${slot.time}`}
                            disabled={!slot.available}
                            onClick={() => {
                              setSelectedSlot(slot.time);
                              setSelectedCourt(court);
                            }}
                            className={`py-3 px-4 rounded border font-label-md text-center transition-colors ${
                              !slot.available
                                ? "border-surface-variant text-outline bg-surface-variant cursor-not-allowed opacity-50"
                                : selectedSlot === slot.time && selectedCourt === court
                                ? "bg-primary text-on-primary border-primary"
                                : "border-outline-variant text-on-surface hover:border-primary hover:text-primary cursor-pointer bg-white"
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="col-span-1 lg:col-span-4 relative">
        <div
          className="sticky top-[120px] bg-white/90 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/50 p-md flex flex-col"
          style={{ backdropFilter: "blur(12px)" }}
        >
          <h3 className="text-headline-lg text-primary mb-md">Booking Summary</h3>

          <div className="space-y-4 mb-lg flex-grow">
            <div className="flex justify-between items-start border-b border-surface-variant pb-4">
              <div>
                <p className="text-label-sm text-outline uppercase tracking-wider">Date</p>
                <p className="text-label-md text-on-surface mt-1">
                  Oct {selectedDay || "—"}, 2024
                </p>
              </div>
              <div className="text-right">
                <p className="text-label-sm text-outline uppercase tracking-wider">Time</p>
                <p className="text-label-md text-on-surface mt-1">
                  {selectedSlot || "—"} - 11:00 AM
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center border-b border-surface-variant pb-4">
              <div>
                <p className="text-label-sm text-outline uppercase tracking-wider">Court</p>
                <p className="text-label-md text-on-surface mt-1">
                  {selectedCourt}
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low p-sm rounded-lg flex items-start space-x-3 border border-secondary-container">
              <span className="material-symbols-outlined text-secondary mt-0.5">verified</span>
              <div>
                <p className="text-label-md text-secondary font-semibold">
                  Elite Member Perk
                </p>
                <p className="text-body-md text-sm text-on-surface-variant">
                  Complimentary luxury towels & smart water included.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-outline-variant/30">
            <div className="flex justify-between items-end mb-4">
              <span className="text-body-lg text-outline">Total</span>
              <span className="text-headline-xl text-primary">$120.00</span>
            </div>
            <button className="w-full bg-primary text-on-primary py-4 rounded font-label-md text-center hover:bg-primary/90 transition-colors active:scale-95 shadow-md flex items-center justify-center">
              Confirm Booking
              <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </button>
            <p className="text-center text-label-sm text-outline mt-3">
              Free cancellation up to 24h prior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailsPage;
