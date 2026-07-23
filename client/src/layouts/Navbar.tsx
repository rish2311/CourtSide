import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  Menu,
  Moon,
  Sun,
  LogOut,
  User,
  LayoutDashboard,
  CalendarCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "../store/authStore";
import { getInitials } from "../utils/helpers";
import { ROUTES } from "../utils/constants";

const links = [
  { name: "Discover", href: ROUTES.HOME },
  { name: "Venues", href: ROUTES.VENUES },
  { name: "Dashboard", href: ROUTES.DASHBOARD },
];

const Navbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuthStore();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-outline-variant/30 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link
            to={ROUTES.HOME}
            className="font-heading text-2xl font-bold tracking-tighter text-primary"
          >
            CourtSide
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* CTA button */}
          <Link to={ROUTES.VENUES}>
            <Button
              variant="default"
              size="lg"
              className="hidden  dark:text-white sm:inline-flex"
            >
              Book Now
            </Button>
          </Link>

          {/* Auth section */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar size="sm">
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.firstName} />
                  ) : null}
                  <AvatarFallback>
                    {getInitials(`${user.firstName} ${user.lastName}`)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  render={
                    <Link
                      to={ROUTES.PROFILE}
                      className="flex items-center gap-2"
                    >
                      <User className="size-4" />
                      Profile
                    </Link>
                  }
                />
                <DropdownMenuItem
                  render={
                    <Link
                      to={ROUTES.DASHBOARD}
                      className="flex items-center gap-2"
                    >
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </Link>
                  }
                />
                <DropdownMenuItem
                  render={
                    <Link
                      to={ROUTES.BOOKINGS}
                      className="flex items-center gap-2"
                    >
                      <CalendarCheck className="size-4" />
                      My Bookings
                    </Link>
                  }
                />
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={logout}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to={ROUTES.LOGIN}>
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button variant="default" size="lg" className="text-white">
                  Sign up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger
              className="md:hidden"
              render={<Button variant="ghost" size="icon" />}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" showCloseButton className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left font-heading text-xl text-primary">
                  CourtSide
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4 mt-4">
                {links.map((link) => (
                  <SheetClose
                    key={link.name}
                    render={
                      <Link
                        to={link.href}
                        className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                          isActive(link.href)
                            ? "bg-primary/10 text-primary"
                            : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        {link.name}
                      </Link>
                    }
                  />
                ))}
              </div>

              <div className="mt-auto px-4 pb-6">
                <div className="border-t border-outline-variant/30 pt-4">
                  {isAuthenticated && user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {user.avatar ? (
                            <AvatarImage
                              src={user.avatar}
                              alt={user.firstName}
                            />
                          ) : null}
                          <AvatarFallback>
                            {getInitials(`${user.firstName} ${user.lastName}`)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <SheetClose
                        render={
                          <Link to={ROUTES.PROFILE}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                            >
                              <User className="size-4 mr-2" />
                              Profile
                            </Button>
                          </Link>
                        }
                      />
                      <SheetClose
                        render={
                          <Link to={ROUTES.BOOKINGS}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                            >
                              <CalendarCheck className="size-4 mr-2" />
                              My Bookings
                            </Button>
                          </Link>
                        }
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full justify-start"
                        onClick={logout}
                      >
                        <LogOut className="size-4 mr-2" />
                        Log out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <SheetClose
                        render={
                          <Link to={ROUTES.LOGIN}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              Log in
                            </Button>
                          </Link>
                        }
                      />
                      <SheetClose
                        render={
                          <Link to={ROUTES.REGISTER}>
                            <Button size="sm" className="w-full">
                              Sign up
                            </Button>
                          </Link>
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
