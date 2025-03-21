"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoChevronDown,
  IoChevronUp,
  IoLogoApple,
  IoLogoAndroid,
} from "react-icons/io5";

import Button from "@/components/common/Button";
import Container from "@/components/layout/Container";
import { SOCIAL_LINKS } from "@/lib/constants";
import { RiTelegram2Line } from "react-icons/ri";
import { FaApple } from "react-icons/fa";

interface FooterLinkSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

const footerSections: FooterLinkSection[] = [
  {
    title: "Games",
    links: [
      { label: "Game 1", href: "/games/1" },
      { label: "Game 2", href: "/games/2" },
      { label: "Game 3", href: "/games/3" },
      { label: "Game 14", href: "/games/14" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Promotions", href: "/promotions" },
      { label: "VIP", href: "/vip" },
      { label: "Help Center", href: "/help-center" },
      { label: "Awards & Certificates", href: "/awards" },
      { label: "App", href: "/app" },
    ],
  },
  {
    title: "Legal Information",
    links: [
      { label: "General Terms & Conditions", href: "/terms" },
      { label: "Responsible Gaming Policy", href: "/responsible-gaming" },
      { label: "Sports Betting Rules", href: "/betting-rules" },
      { label: "Privacy and Cookies Policy", href: "/privacy" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "Limits", href: "/limits" },
    ],
  },
];

const socialIcons = [
  {
    id: "telegram",
    icon: <RiTelegram2Line />,
    href: SOCIAL_LINKS.TELEGRAM,
    label: "Telegram",
  },
  {
    id: "facebook",
    icon: <IoLogoFacebook />,
    href: SOCIAL_LINKS.FACEBOOK,
    label: "Facebook",
  },
  {
    id: "instagram",
    icon: <IoLogoInstagram />,
    href: SOCIAL_LINKS.INSTAGRAM,
    label: "Instagram",
  },
  {
    id: "twitter",
    icon: <IoLogoTwitter />,
    href: SOCIAL_LINKS.TWITTER,
    label: "Twitter",
  },
];

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderHelpCenter = () => (
    <div className="help-center bg-[#1A3157] lg:bg-transparent rounded-lg flex justify-between items-center lg:items-start lg:flex-col px-6 py-4  lg:p-0">
      <div>
        <h3 className="font-medium text-[15px] lg:text-lg mb-2">Help Center</h3>
        <p className="text-sm font-normal text-gray-400 mb-3">
          If you have any questions?
        </p>
      </div>
      <Button
        variant="primary"
        className="bg-[#3555FF] text-sm rounded-[10px] hover:bg-blue-700 transition-colors lg:mb-10"
        href="/help-center"
      >
        GET ANSWERS
      </Button>
    </div>
  );

  const renderSocialIcons = () => (
    <div className="flex justify-center md:justify-start space-x-6 mb-4">
      {socialIcons.map((social) => (
        <Link
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label={social.label}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
  const DownloadButton = ({
    href,
    icon,
    label,
    subLabel,
    className = "",
  }: {
    href: string;
    icon: React.ReactNode;
    label: string;
    subLabel?: string;
    className?: string;
  }) => (
    <Link
      href={href}
      className={`flex lg:flex-col items-center justify-center bg-[#1A3157] hover:bg-[#253D66] text-white rounded-lg py-3 px-4 transition-colors shadow-md w-full ${className}`}
    >
      {icon}
      <div className="ml-3 text-sm font-medium whitespace-nowrap">
        <span>{label}</span>
        {subLabel && <p className="text-xs text-gray-400">{subLabel}</p>}
      </div>
    </Link>
  );

  const renderAppDownload = () => (
    <div className="app-download-section w-full">
      {/* Desktop version */}
      <div className="hidden lg:grid grid-rows-2 gap-4 w-fit mx-auto">
        <DownloadButton
          href="/download/mac"
          icon={<FaApple size={40} />}
          label="Bluechip App"
          subLabel="for Mac OS"
          className="lg:flex-row"
        />

        <div className="grid grid-flow-col gap-4">
          <DownloadButton
            href="/download/android"
            icon={<IoLogoAndroid size={40} />}
            label="Android"
          />
          <DownloadButton
            href="/download/ios"
            icon={<IoLogoApple size={40} />}
            label="iOS"
          />
        </div>
      </div>

      {/* Mobile version */}
      <div className="flex lg:hidden gap-2 mt-2">
        <DownloadButton
          href="/download/android"
          icon={<IoLogoAndroid size={36} />}
          label="Android"
          subLabel="Download for"
          className="flex-1 min-h-[60px]"
        />
        <DownloadButton
          href="/download/ios"
          icon={<IoLogoApple size={36} />}
          label="iOS"
          subLabel="Download for"
          className="flex-1 min-h-[60px]"
        />
      </div>
    </div>
  );
  return (
    <footer className="bg-dark-blue text-white bg-[#12294A] py-8">
      <Container size="xl">
        {/* Desktop Footer */}
        <div className="hidden md:flex -mx-4">
          {/* Help Center Column */}
          <div className="px-4 w-full sm:w-1/2 md:w-1/4 mb-8">
            {renderHelpCenter()}
            <div className="mt-6">{renderSocialIcons()}</div>
          </div>
          {/* Link Columns */}
          {footerSections.map((section) => (
            <div
              key={section.title}
              className="px-4 w-full sm:w-1/2 md:w-1/4 mb-8"
            >
              <h3 className="font-medium text-[15px] mb-5">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-normal text-gray-400 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App Download Section */}
          <div className="px-4  w-full sm:w-1/2 md:w-1/4 ">
            {renderAppDownload()}
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="md:hidden">
          {/* Collapsible Sections */}
          {footerSections.map((section) => (
            <div
              key={section.title}
              className="border-b border-gray-800 bg-[#1A3157] px-3 mb-3 round-xl"
            >
              <button
                className="flex items-center justify-between w-full py-4 text-left font-bold"
                onClick={() => toggleSection(section.title)}
                aria-expanded={!!expandedSections[section.title]}
                aria-controls={`footer-section-${section.title}`}
              >
                {section.title}
                <span>
                  {expandedSections[section.title] ? (
                    <IoChevronUp />
                  ) : (
                    <IoChevronDown />
                  )}
                </span>
              </button>

              {expandedSections[section.title] && (
                <ul
                  id={`footer-section-${section.title}`}
                  className="py-2 pb-4 space-y-2"
                >
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Follow Us Section */}
          <div className="py-6 text-center">
            <h3 className="font-medium text-lg mb-5">Follow Us</h3>
            {renderSocialIcons()}
          </div>

          <div>{renderHelpCenter()}</div>

          <div className="flex justify-center space-x-4 ">
            {renderAppDownload()}
          </div>
        </div>
      </Container>

      <style jsx global>{`
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          color: #fff;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background-color: var(--accent-color, #ff2e8e);
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
