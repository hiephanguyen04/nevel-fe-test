"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoMenu, IoSearch, IoClose } from "react-icons/io5";
import { cn } from "@/lib/utils/classNames";
import Container from "@/components/layout/Container";
import Button from "@/components/common/Button";


interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "GAME", href: "/game" },
  { label: "INFOR", href: "/infor" },
  { label: "NEWS", href: "/news" },
  { label: "PROMOTIONS", href: "/promotions" },
  { label: "VIP", href: "/vip" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  /**
   * Close mobile menu when route changes
   */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  /**
   * Detect scroll for header styling
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Close menu when clicking outside or pressing escape
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        e.target instanceof Node &&
        !mobileMenuRef.current.contains(e.target) &&
        !(e.target as Element).closest(".menu-toggle")
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  /**
   * Prevent scrolling when menu is open
   */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "py-4 sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-primary/90 backdrop-blur-md shadow-md" : "bg-primary"
      )}
    >
      <Container size="xl">
        <div className="flex items-center justify-between">
          {/* Menu Icon - Mobile Only */}
          <div className="flex gap-1">
            <div className="flex items-center md:hidden">
              <button
                className="text-2xl text-white menu-toggle hover-effect"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <IoMenu />
              </button>
            </div>

            <div className="flex items-center  gap-14">
              <div
                className={cn(
                  "flex items-center",
                  "md:order-first" 
                )}
              >
                <Link
                  href="/"
                  className="logo-link flex items-center hover:opacity-85 transition-opacity"
                >
                  <span className="text-white font-bold flex items-center">
                    <Image
                      src="/logo.svg"
                      alt="Logo"
                      width={68}
                      height={30}
                      className="mr-1 h-4 w-8 lg:h-8 lg:w-17"
                    />
                  </span>
                </Link>
              </div>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6 mx-auto">
                {/* Search Icon - Desktop Only */}
                <div className="hidden md:flex items-center mr-2">
                  <button
                    className="search-icon-btn text-2xl text-white hover:text-accent transition-all hover:scale-110"
                    aria-label="Search"
                  >
                    <IoSearch />
                  </button>
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "nav-link relative text-white text-[15px] transition-colors rounded-md font-medium",
                      pathname === item.href
                        ? "text-accent"
                        : "hover:text-accent"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              href="/login"
              variant={"dark"}
              className={cn(
                "auth-btn login-btn px-4 py-2 text-white bg-black-300 rounded-md transition-all",
                "hover:bg-secondary hover:shadow-md"
              )}
            >
              LOGIN
            </Button>
            <Button
              variant={"success"}
              href="/register"
              className="auth-btn register-btn px-4 py-2 text-white rounded-xl hover:bg-highlight/90 hover:shadow-lg hover:shadow-highlight/20 transition-all"
            >
              REGISTRATION
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed bg-[#00000091] inset-0 z-50 bg-primary bg-opacity-95 pt-20"
          aria-modal="true"
          role="dialog"
          aria-label="Main menu"
        >
          <div className="absolute top-4 right-4">
            <button
              className="text-3xl text-white hover:text-accent hover:rotate-90 transition-all duration-300"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <IoClose />
            </button>
          </div>
          <nav className="flex flex-col items-center  space-y-6 pt-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "mobile-nav-link text-xl text-white transition-all duration-300",
                  pathname === item.href
                    ? "text-accent font-medium"
                    : "hover:text-accent hover:translate-x-1"
                )}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Global styles for hover effects */}
      <style jsx global>{`
        /* Nav link hover effect with animated underline */
        .nav-link::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -6px;
          left: 0;
          background-color: var(--accent-color, #ff2e8e);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Mobile nav link hover effect */
        .mobile-nav-link:hover {
          text-shadow: 0 0 8px rgba(255, 46, 142, 0.6);
        }

        /* Icon hover effects */
        .hover-effect {
          transition: all 0.3s ease;
        }

        .hover-effect:hover {
          transform: scale(1.1);
          color: var(--accent-color, #ff2e8e);
        }

        /* Auth button hover effects */
        .auth-btn {
          position: relative;
          overflow: hidden;
        }

        .auth-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.7s ease;
        }

        .auth-btn:hover::before {
          left: 100%;
        }

        /* Logo hover pulse effect */
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .logo-link:hover {
          animation: pulse 0.8s infinite;
        }

        /* Search icon hover glow effect */
        .search-icon-btn:hover {
          text-shadow: 0 0 10px rgba(255, 46, 142, 0.7);
        }
      `}</style>
    </header>
  );
};

export default Header;
