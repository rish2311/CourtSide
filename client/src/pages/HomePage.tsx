import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Star,
  ChevronRight,
  MapPin,
  Clock,
} from "lucide-react";

const stats = [
  { label: "Active Venues", value: "500+" },
  { label: "Courts Booked", value: "50K+" },
  { label: "Happy Players", value: "25K+" },
  { label: "Avg Rating", value: "4.8" },
];

const clubs = [
  "WIMBLEDON REC",
  "ROLAND GARROS CLUB",
  "FLUSHING MEADOWS PRO",
  "MELBOURNE PARK ELITE",
  "MONTE CARLO CC",
];

const demoVenues = [
  {
    name: "Wimbledon Recreation Club",
    sport: "Tennis",
    location: "Wimbledon, London",
    price: "₹1,200/hr",
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&q=80",
    courts: 6,
  },
  {
    name: "Melbourne Park Arena",
    sport: "Badminton",
    location: "Southbank, Melbourne",
    price: "₹800/hr",
    rating: 4.8,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80",
    courts: 4,
  },
  {
    name: "Flushing Meadows Sports Hub",
    sport: "Squash",
    location: "Queens, New York",
    price: "₹1,500/hr",
    rating: 4.7,
    reviews: 204,
    image: "https://images.unsplash.com/photo-1577717903315-1691ae25abf8?w=600&q=80",
    courts: 8,
  },
];

const testimonials = [
  {
    quote:
      "CourtSide transformed how we organize our weekly matches. The booking experience is seamless.",
    author: "Sarah K.",
    role: "Tennis Coach",
  },
  {
    quote:
      "As a venue owner, the platform gives me complete control over scheduling and revenue management.",
    author: "Marcus R.",
    role: "Venue Director",
  },
  {
    quote:
      "Finding available courts used to be a hassle. Now I book in seconds and play more.",
    author: "Alex M.",
    role: "Competitive Player",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/venues?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/venues");
    }
  };

  return (
    <div className="bg-background text-on-surface">
      {/* ─── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat scale-105"
            style={{
              backgroundImage: "url('/hero_bg_court.jpeg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
                <Star className="w-4 h-4 fill-primary" />
                Premium sports venue booking platform
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
                <span className="text-on-surface">Master Your</span>{" "}
                <span className="text-primary">Game.</span>
              </h1>

              <p className="text-lg sm:text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
                you like that court, you booked it
              </p>

              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mb-12"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by venue, sport, or location..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-surface-bright border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-primary text-on-primary rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  Search
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/venues"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Explore Venues
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-surface-bright text-on-surface rounded-xl font-medium border border-outline-variant/30 hover:bg-surface-container transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ─── Stats ──────────────────────────────────────────── */}
      <section className="relative -mt-16 z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-outline-variant/20 shadow-lg">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-surface-bright py-8 px-6 text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-on-surface-variant font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust Bar ──────────────────────────────────────── */}
      <section className="w-full py-16 border-y border-outline-variant/10 bg-surface/50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center mb-8">
          <p className="text-xs font-semibold text-on-surface-variant tracking-widest uppercase">
            Trusted by elite clubs worldwide
          </p>
        </div>
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee whitespace-nowrap">
            {[...Array(3)].map((_, repeatIdx) => (
              <span
                key={repeatIdx}
                className="inline-flex gap-16 items-center mx-8"
              >
                {clubs.map((club) => (
                  <span
                    key={`${club}-${repeatIdx}`}
                    className="text-xl md:text-2xl font-bold text-outline/40"
                  >
                    {club}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Venue Cards ────────────────────────────────────── */}
      <section className="w-full py-24 md:py-32 bg-surface/50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-16 max-w-2xl">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-4">
              Featured Venues
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">
              Premium Courts Near You.
            </h2>
            <p className="text-lg text-on-surface-variant">
              Hand-picked venues with world-class facilities, ready for your next game.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {demoVenues.map((venue) => (
              <Link
                key={venue.name}
                to="/venues"
                className="group bg-surface-bright rounded-2xl overflow-hidden border border-outline-variant/10 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-primary text-on-primary text-xs font-semibold px-3 py-1 rounded-full">
                    {venue.sport}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-white text-sm font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {venue.location}
                    </div>
                    <div className="flex items-center gap-1 text-white text-sm font-medium">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      {venue.rating}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-on-surface mb-2 group-hover:text-primary transition-colors">
                    {venue.name}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-on-surface-variant mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{venue.courts} courts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500" />
                      <span>{venue.rating} ({venue.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                    <span className="text-xl font-bold text-primary">
                      {venue.price}
                    </span>
                    <span className="text-sm font-medium text-primary group-hover:gap-2 transition-all inline-flex items-center gap-1">
                      Book Now
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ───────────────────────────────────── */}
      <section className="w-full py-24 md:py-32 bg-surface/30 border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-4">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">
              Loved by Players & Owners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="bg-surface-bright rounded-2xl p-8 border border-outline-variant/10"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-on-surface-variant leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      {t.author}
                    </p>
                    <p className="text-xs text-on-surface-variant">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────── */}
      <section className="w-full py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">
              Ready to Play?
            </h2>
            <p className="text-lg text-on-surface-variant mb-10">
              Join thousands of players booking courts every day. Sign up free
              and start playing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3.5 bg-primary text-on-primary rounded-xl font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 inline-flex items-center justify-center gap-2"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/venues"
                className="px-8 py-3.5 bg-surface-bright text-on-surface rounded-xl font-medium border border-outline-variant/30 hover:bg-surface-container transition-all inline-flex items-center justify-center gap-2"
              >
                Browse Venues
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
