import { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { icon: "dashboard", label: "Overview", active: true },
  { icon: "calendar_today", label: "Bookings" },
  { icon: "monitoring", label: "Performance" },
  { icon: "payments", label: "Payments" },
  { icon: "settings", label: "Settings" },
];

const footerNav = [
  { icon: "help", label: "Help" },
  { icon: "logout", label: "Logout" },
];

const upcomingMatches = [
  { title: "vs. Sarah Jenkins", type: "Court 1 • Singles", time: "Today, 14:00", icon: "sports_tennis" },
  { title: "Mixed Doubles", type: "Court 4 • Practice", time: "Oct 26, 09:00", icon: "group" },
];

const recentBookings = [
  { date: "OCT 22", description: "Court 3 (2hrs)", amount: "-120 CR" },
  { date: "OCT 19", description: "Pro Clinic", amount: "-400 CR" },
];

const DashboardPage = () => {
  const [activeNav, setActiveNav] = useState("Overview");

  return (
    <div className="flex h-screen pt-[73px]">
      <aside className="bg-surface h-full w-64 border-r border-outline-variant flex flex-col p-md space-y-base flex-shrink-0 relative z-20">
        <div className="mb-lg flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-md border-2 border-primary-fixed">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRlgI5ohlk_mIzhvMhX2xZP-dkPcI4YKK9zfa_EAvX49zZOPVQZp_JZfCeB0qYsMveVLtyoGafOZRnIAu39V82sEvSyQhzgRXJxKhaFTmI6iluv5ZRf93PNSWYuD2hSMKlIjBXXxnNlYMhCz6shH1lHZNDGJtC3KmilNUbsYcYG_a282ctATkqtZIBbTOiK1K81AsGmL0ZI1HMn1gEdRCN1CantWrYRxsn2d81d7fcg4IogyaxbpLuMH2d4Bmjdd4aQuVHcGpKW5Ps"
              alt="Profile"
            />
          </div>
          <h2 className="text-headline-lg text-primary">Alex Morgan</h2>
          <p className="text-label-md text-on-surface-variant mt-xs">Elite Member</p>
        </div>

        <nav className="flex-1 flex flex-col gap-y-xs">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`flex items-center gap-x-sm px-4 py-3 rounded-lg transition-all duration-200 ${
                activeNav === item.label
                  ? "bg-secondary-container text-on-secondary-container font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-high font-medium"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={activeNav === item.label ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-label-md">{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="w-full bg-surface-container text-primary font-label-md py-3 rounded-lg border border-outline-variant hover:bg-surface-container-high transition-colors mb-lg">
          Upgrade to Pro
        </button>

        <div className="border-t border-outline-variant/50 pt-md flex flex-col gap-y-xs">
          {footerNav.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-x-sm px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 font-medium"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-label-md">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-surface-bright">
        <header className="sticky top-0 z-10 bg-surface-bright/80 backdrop-blur-md border-b border-outline-variant/30 px-xl py-md flex justify-between items-center">
          <div>
            <h1 className="text-headline-xl text-primary">{activeNav}</h1>
            <p className="text-body-md text-on-surface-variant mt-1">October 24, 2024</p>
          </div>
          <div className="flex gap-x-md">
            <Link
              to="/venues"
              className="bg-primary text-on-primary font-label-md px-6 py-3 rounded hover:bg-primary/90 transition-colors shadow-sm"
            >
              Book Court
            </Link>
          </div>
        </header>

        <div className="px-xl py-lg max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-gutter">
            <section className="col-span-12 lg:col-span-8 bg-surface rounded-xl border border-outline-variant/30 p-md shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-lg">
                <div>
                  <h3 className="text-headline-lg text-primary">Performance Insights</h3>
                  <p className="text-body-md text-on-surface-variant mt-1">
                    Win rate trajectory over last 30 days
                  </p>
                </div>
                <div className="flex gap-x-2">
                  <span className="bg-secondary-container text-on-secondary-container font-mono text-sm px-3 py-1 rounded-full">
                    +12.4%
                  </span>
                </div>
              </div>

              <div className="flex-1 min-h-[300px] relative w-full mt-auto">
                <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1b6b51" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#1b6b51" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line className="chart-grid" x1="0" y1="50" x2="800" y2="50" />
                  <line className="chart-grid" x1="0" y1="150" x2="800" y2="150" />
                  <line className="chart-grid" x1="0" y1="250" x2="800" y2="250" />
                  <path
                    className="chart-area"
                    d="M0,250 L0,180 L100,120 L200,150 L300,90 L400,110 L500,60 L600,80 L700,40 L800,20 L800,250 Z"
                  />
                  <path
                    className="chart-line"
                    d="M0,180 L100,120 L200,150 L300,90 L400,110 L500,60 L600,80 L700,40 L800,20"
                  />
                  <circle cx="100" cy="120" fill="#1b6b51" r="4" />
                  <circle cx="300" cy="90" fill="#1b6b51" r="4" />
                  <circle cx="500" cy="60" fill="#1b6b51" r="4" />
                  <circle cx="700" cy="40" fill="#1b6b51" r="4" />
                </svg>
                <div className="absolute bottom-[-24px] left-0 w-full flex justify-between font-mono text-xs text-outline">
                  <span>W1</span>
                  <span>W2</span>
                  <span>W3</span>
                  <span>W4</span>
                </div>
              </div>
            </section>

            <section className="col-span-12 lg:col-span-4 bg-primary text-on-primary rounded-xl p-md shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-md">
                  <span className="material-symbols-outlined text-secondary-container text-3xl">emoji_events</span>
                  <span className="text-label-sm text-primary-fixed uppercase tracking-widest">Global Rank</span>
                </div>
                <h3 className="text-display-lg font-mono">#14</h3>
                <p className="text-body-md text-primary-fixed-dim mt-2">
                  Top 2% of members globally
                </p>
              </div>
              <div className="relative z-10 mt-xl pt-md border-t border-primary-fixed-variant flex justify-between items-end">
                <div>
                  <p className="text-label-sm text-primary-fixed uppercase mb-1">Next Tier</p>
                  <p className="text-body-md">Grand Slam</p>
                </div>
                <div className="text-right">
                  <p className="text-label-sm text-primary-fixed uppercase mb-1">Points Needed</p>
                  <p className="font-mono text-lg text-secondary-container">2,450</p>
                </div>
              </div>
            </section>

            <section className="col-span-12 lg:col-span-6 bg-surface rounded-xl border border-outline-variant/30 p-md shadow-sm">
              <h3 className="text-headline-lg text-primary mb-lg">Upcoming Matches</h3>
              <div className="space-y-sm">
                {upcomingMatches.map((match) => (
                  <div
                    key={match.title}
                    className="flex items-center p-sm hover:bg-surface-container transition-colors rounded-lg group"
                  >
                    <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold mr-md">
                      <span className="material-symbols-outlined">{match.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-label-md text-on-surface">{match.title}</h4>
                      <p className="text-body-md text-on-surface-variant text-sm">{match.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm text-primary">{match.time}</p>
                      <button className="text-xs text-label-sm text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="col-span-12 lg:col-span-6 grid grid-rows-2 gap-gutter">
              <div className="bg-surface rounded-xl border border-outline-variant/30 p-md shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-label-sm text-outline uppercase tracking-wider mb-2">
                    Pro Credits Balance
                  </p>
                  <h3 className="text-display-lg font-mono text-primary">
                    1,200<span className="text-2xl text-outline ml-2">CR</span>
                  </h3>
                </div>
                <button className="bg-secondary-container text-on-secondary-container font-label-md px-4 py-2 rounded-lg hover:bg-secondary-container/80 transition-colors">
                  Top Up
                </button>
              </div>

              <div className="bg-surface rounded-xl border border-outline-variant/30 p-md shadow-sm">
                <div className="flex justify-between items-center mb-md">
                  <h3 className="text-label-md text-primary font-bold">Recent Bookings</h3>
                  <Link to="/bookings" className="text-sm text-label-sm text-secondary hover:underline">
                    View All
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.date + booking.description}
                      className="flex justify-between items-center text-sm border-b border-outline-variant/20 pb-2"
                    >
                      <span className="text-on-surface-variant font-mono">{booking.date}</span>
                      <span className="text-on-surface">{booking.description}</span>
                      <span className="text-outline font-mono">{booking.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
