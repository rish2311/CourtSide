import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: "Discover", href: "/" },
    { name: "Venues", href: "/venues" },
    { name: "Memberships", href: "/memberships" },
    { name: "Support", href: "/support" },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm flex justify-between items-center px-xl py-md z-50">
      <div className="flex items-center gap-xl">
        <Link
          to="/"
          className="text-display-lg tracking-tighter text-primary dark:text-primary-fixed cursor-pointer active:scale-95 transition-transform"
        >
          CourtSide
        </Link>

        <nav className="hidden md:flex gap-lg">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`text-label-md transition-all duration-200 cursor-pointer active:scale-95 ${
                  isActive
                    ? "text-primary font-bold border-b-2 border-primary pb-1"
                    : "text-on-surface-variant font-medium hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-md">
        <Link
          to="/dashboard"
          className="text-label-md text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 cursor-pointer active:scale-95 hidden sm:block"
        >
          Dashboard
        </Link>
        <Link
          to="/venues"
          className="bg-primary text-on-primary font-label-md text-label-md px-md py-sm rounded hover:bg-primary/90 transition-colors duration-200 cursor-pointer active:scale-95"
        >
          Book Now
        </Link>
        <Link to="/profile">
          <img
            className="w-10 h-10 rounded-full object-cover border border-outline-variant/30 cursor-pointer active:scale-95 transition-transform"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuJxzMEDCBxaoag7fOWkW9Dy5fEjCwLMvV4scVfYM8mVVrqtUwUfpNGBVp3S78E6CkjxQOvTqPdozQXpbXPkoXtf81WiX0VijbiKLbnZH5Ek4YVgCXcrO8dqyYvKwvGwCjtc3Bt9Srv4pHOGFfz9pbFnwSUwKKxkByEoAT1oqaB97owvOCzS3UFmKLD6kNHV5556Z9qaj9H5BuQOjfycM7EqgWBk-4ki30UkAZ00031TWA6ZgDglrpCB2REtXk3ytV3eH3SObVFbct"
            alt="User profile"
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
