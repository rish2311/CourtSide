import { useState, useRef, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Star,
  MapPin,
  Clock,
  Activity,
  Zap,
  Shield,
  Trophy
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Active Venues", value: "500+", target: 500, suffix: "+" },
  { label: "Courts Booked", value: "50K+", target: 50, suffix: "K+" },
  { label: "Happy Players", value: "25K+", target: 25, suffix: "K+" },
  { label: "Avg Rating", value: "4.8", target: 4.8, decimals: 1 },
];

const clubs = [
  "WIMBLEDON REC",
  "ROLAND GARROS",
  "FLUSHING MEADOWS",
  "MELBOURNE PARK",
  "MONTE CARLO CC",
  "O2 ARENA",
];

const demoVenues = [
  {
    name: "Wimbledon Recreation Club",
    sport: "Tennis",
    location: "Wimbledon, London",
    price: "₹1,200/hr",
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80",
    courts: 6,
    color: "from-green-500/20 to-emerald-700/20"
  },
  {
    name: "Melbourne Park Arena",
    sport: "Badminton",
    location: "Southbank, Melbourne",
    price: "₹800/hr",
    rating: 4.8,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80",
    courts: 4,
    color: "from-blue-500/20 to-indigo-700/20"
  },
  {
    name: "Flushing Meadows Hub",
    sport: "Squash",
    location: "Queens, New York",
    price: "₹1,500/hr",
    rating: 4.7,
    reviews: 204,
    image: "https://images.unsplash.com/photo-1577717903315-1691ae25abf8?w=800&q=80",
    courts: 8,
    color: "from-orange-500/20 to-red-700/20"
  },
];

const testimonials = [
  {
    quote: "CourtSide transformed how we organize matches. Seamless and beautiful.",
    author: "Sarah K.",
    role: "Tennis Coach",
  },
  {
    quote: "Platform gives me complete control over scheduling and revenue.",
    author: "Marcus R.",
    role: "Venue Director",
  },
  {
    quote: "Booking used to be a hassle. Now I book in seconds and play more.",
    author: "Alex M.",
    role: "Pro Player",
  },
  {
    quote: "Best UI I've ever seen for a sports app. Absolutely incredible.",
    author: "Priya S.",
    role: "Badminton Champ",
  },
  {
    quote: "Unmatched ease of use and the venues are always top tier.",
    author: "John D.",
    role: "Weekend Warrior",
  }
];

const liveFeed = [
  { name: "Arjun K.", venue: "Wimbledon Rec", time: "2 mins ago" },
  { name: "Priya S.", venue: "Melbourne Arena", time: "5 mins ago" },
  { name: "Rahul M.", venue: "Flushing Meadows", time: "8 mins ago" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const mainRef = useRef(null);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/venues?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/venues");
    }
  };

  useEffect(() => {
    const q = gsap.utils.selector(mainRef);
    const ctx = gsap.context(() => {
      // Hero Animations — sequential timeline, no stacked delays
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".hero-badge",      { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo(".hero-title-word", { y: 80, opacity: 0, rotate: 4 }, { y: 0, opacity: 1, rotate: 0, duration: 0.9, stagger: 0.08, ease: "expo.out" }, "-=0.3")
        .fromTo(".hero-subtitle",   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(".hero-search",     { y: 20, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)" }, "-=0.4")
        .fromTo(".hero-stats",      { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(".floating-card-1", { y: 40, opacity: 0, rotate: -10 }, { y: 0, opacity: 1, rotate: -6, duration: 1, ease: "back.out(1.2)" }, "-=0.6")
        .fromTo(".floating-card-2", { y: 40, opacity: 0, rotate: 10 },  { y: 0, opacity: 1, rotate: 6,  duration: 1, ease: "back.out(1.2)" }, "-=0.9");

      // Continuous float loops (start after timeline)
      heroTl.call(() => {
        gsap.to(".floating-card-1", { y: "-=15", rotate: "-=2", duration: 3,   yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(".floating-card-2", { y: "+=15", rotate: "+=2", duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
      });

      // Stats Count Up
      q(".stat-item").forEach((item) => {
        const valueEl = item.querySelector(".stat-value");
        if (!valueEl) return;
        const target = parseFloat((valueEl as HTMLElement).dataset.target ?? "0");
        const decimals = parseInt((valueEl as HTMLElement).dataset.decimals ?? "0", 10);
        const suffix = (valueEl as HTMLElement).dataset.suffix ?? "";
        
        gsap.fromTo(valueEl, 
          { innerHTML: 0 }, 
          {
            innerHTML: target,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: { trigger: item as HTMLElement, start: "top 95%" },
            onUpdate: function() {
              valueEl.innerHTML = Number(this.targets()[0].innerHTML).toFixed(decimals) + suffix;
            }
          }
        );
      });

      // Section Reveals
      q(".reveal-up").forEach((el) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el as HTMLElement, start: "top 95%" } }
        );
      });

      // Staggered Grids
      q(".stagger-grid").forEach((grid) => {
        gsap.fromTo(grid.children, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: grid as HTMLElement, start: "top 95%" } }
        );
      });

      // Testimonial Marquee Custom GSAP
      const marqueeInner = q(".testimonial-marquee-inner");
      if (marqueeInner.length) {
        gsap.to(marqueeInner, {
          xPercent: -50,
          ease: "none",
          duration: 30,
          repeat: -1,
        });
      }

      // Parallax Image Cards
      q(".parallax-card").forEach((card) => {
        const img = card.querySelector(".parallax-img");
        if(img) {
          gsap.to(img, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });

    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-background text-on-surface overflow-x-hidden selection:bg-primary/20">
      
      {/* ─── HERO SECTION ───────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-background z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] mix-blend-multiply animate-pulse" style={{animationDuration: '8s'}} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cta/20 blur-[120px] mix-blend-multiply animate-pulse" style={{animationDuration: '10s'}} />
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">
          
          <div className="hero-badge inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-surface/50 backdrop-blur-md text-primary text-sm font-semibold mb-8 shadow-sm">
            <Zap className="w-4 h-4 fill-primary" />
            Next-Gen Sports Booking
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tighter leading-[0.85] mb-8 uppercase text-on-surface flex flex-wrap justify-center gap-x-4 lg:gap-x-8">
            <span className="hero-title-word block overflow-hidden"><span className="block">Book.</span></span>
            <span className="hero-title-word block overflow-hidden text-primary"><span className="block">Play.</span></span>
            <span className="hero-title-word block overflow-hidden"><span className="block">Dominate.</span></span>
          </h1>

          <p className="hero-subtitle text-lg sm:text-xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed">
            Experience the future of sports venues. Find, book, and play at elite facilities with zero friction and pure performance.
          </p>

          <form
            onSubmit={handleSearch}
            className="hero-search w-full max-w-2xl flex flex-col sm:flex-row gap-3 p-3 bg-surface/80 backdrop-blur-2xl rounded-[2rem] border border-white/40 shadow-[0_20px_40px_-15px_rgba(0,53,39,0.15)] relative z-20"
          >
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-5 w-5 h-5 text-outline" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courts, sports, or locations..."
                className="w-full pl-14 pr-6 py-4 rounded-full bg-transparent text-on-surface text-lg placeholder:text-outline-variant focus:outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-primary text-on-primary rounded-full font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30 shrink-0 group"
            >
              Search
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="hero-stats mt-14 flex flex-wrap justify-center gap-6 text-sm font-medium text-on-surface-variant">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Secure Booking
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Live Availability
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" /> Elite Venues
            </div>
          </div>
        </div>

        {/* Floating Abstract UI Elements */}
        <div className="hidden lg:block floating-card-1 absolute top-32 left-[5%] w-64 p-5 rounded-3xl bg-surface/60 backdrop-blur-xl border border-white/50 shadow-2xl z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">🎾</span>
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface">Tennis Pro Court</p>
              <p className="text-xs text-green-600 font-semibold">Available Now</p>
            </div>
          </div>
          <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
             <div className="h-full bg-primary w-[70%]" />
          </div>
        </div>

        <div className="hidden lg:block floating-card-2 absolute bottom-32 right-[5%] w-72 p-5 rounded-3xl bg-surface/60 backdrop-blur-xl border border-white/50 shadow-2xl z-10">
           <div className="flex justify-between items-center mb-3">
             <p className="text-xs font-bold text-outline uppercase tracking-wider">Live Feed</p>
             <span className="flex h-2 w-2 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
           </div>
           <div className="space-y-3">
             {liveFeed.slice(0,2).map((item, i) => (
               <div key={i} className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                   {item.name.charAt(0)}
                 </div>
                 <div>
                   <p className="text-sm font-semibold text-on-surface leading-tight">{item.name} booked</p>
                   <p className="text-xs text-on-surface-variant">{item.venue}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </section>

      {/* ─── MARQUEE PARTNERS ───────────────────────────────── */}
      <section className="w-full py-10 bg-surface border-y border-outline-variant/20 overflow-hidden">
        <div className="flex flex-nowrap whitespace-nowrap opacity-60">
          <div className="testimonial-marquee-inner flex gap-16 px-8 items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                {clubs.map(club => (
                  <span key={club} className="text-2xl md:text-3xl font-heading font-extrabold text-outline uppercase tracking-widest">
                    {club}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENTO STATS / FEATURES ─────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="reveal-up text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-6">
            The Numbers Speak
          </h2>
          <p className="text-lg text-on-surface-variant">
            We are building the largest network of premium sports facilities, bringing players and venues together seamlessly.
          </p>
        </div>

        <div className="stagger-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div key={stat.label} className={`stat-item relative overflow-hidden p-8 rounded-[2rem] border border-outline-variant/20 flex flex-col justify-between aspect-square ${idx === 0 || idx === 3 ? 'bg-primary text-on-primary' : 'bg-surface-bright text-on-surface'}`}>
              <p className={`text-sm font-medium ${idx === 0 || idx === 3 ? 'text-on-primary/80' : 'text-outline'}`}>
                {stat.label}
              </p>
              <div>
                <p className="text-5xl md:text-6xl font-bold tracking-tighter stat-value" data-target={stat.target} data-decimals={stat.decimals || 0} data-suffix={stat.suffix || ""}>
                  0
                </p>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── PREMIUM VENUES ─────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="reveal-up flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">
                Elite Venues
              </h2>
              <p className="text-lg text-on-surface-variant">
                Curated facilities designed for peak performance and absolute comfort.
              </p>
            </div>
            <Link to="/venues" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-container transition-colors">
              View all venues <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="stagger-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {demoVenues.map((venue) => (
              <Link
                key={venue.name}
                to="/venues"
                className="parallax-card group block relative rounded-[2rem] overflow-hidden bg-surface-bright border border-outline-variant/20 hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,53,39,0.12)]"
              >
                <div className="relative h-72 overflow-hidden bg-surface-container">
                  <div className="absolute inset-0 z-0 bg-surface-dim" />
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="parallax-img absolute -top-[15%] left-0 w-full h-[130%] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${venue.color} mix-blend-overlay`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider">
                      {venue.sport}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cta transition-colors">
                      {venue.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                      <MapPin className="w-4 h-4" />
                      {venue.location}
                    </div>
                  </div>
                </div>

                <div className="p-6 relative bg-surface-bright">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-highest">
                      <Clock className="w-4 h-4 text-outline" />
                      <span className="text-sm font-semibold text-on-surface">{venue.courts} courts</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-on-surface">{venue.rating}</span>
                      <span className="text-sm text-outline">({venue.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-outline-variant/20">
                    <div>
                      <p className="text-xs text-outline uppercase font-bold tracking-wider mb-0.5">Price</p>
                      <span className="text-xl font-black text-on-surface">
                        {venue.price}
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────────── */}
      <section className="py-24 md:py-32 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center mb-16 reveal-up">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">
            Trusted by the Best
          </h2>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Fading edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-[200%] md:w-[150%] lg:w-[120%]">
            <div className="testimonial-marquee-inner flex gap-6 px-3">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="w-[350px] shrink-0 p-8 rounded-[2rem] bg-surface-bright border border-outline-variant/20 hover:border-primary/30 transition-colors shadow-sm">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-lg text-on-surface-variant font-medium leading-relaxed mb-8">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {t.author[0]}
                    </div>
                    <div>
                      <p className="text-base font-bold text-on-surface">{t.author}</p>
                      <p className="text-sm text-outline">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="reveal-up max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden bg-primary px-8 py-20 md:py-24 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-on-primary mb-6">
              Step onto the court.
            </h2>
            <p className="text-xl text-on-primary/80 mb-12 font-medium">
              Join the fastest growing sports community. Book your first court today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-cta text-on-surface rounded-full font-bold hover:bg-cta/90 transition-all shadow-[0_0_40px_-10px_rgba(217,249,157,0.5)] inline-flex items-center justify-center gap-2 text-lg"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/venues"
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-on-primary rounded-full font-bold border border-white/20 hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2 text-lg"
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
