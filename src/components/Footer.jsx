import React from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Mail,
  Phone,
  Globe,
  Shield,
  Award,
  Clock,
  TrendingUp,
  BookOpen,
  CreditCard,
  DollarSign,
  Headphones,
  ChevronRight,
  Users,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Trading", path: "/trading" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Academy", path: "/academy" },
  ];

  const resources = [
    { name: "Help Center", icon: Headphones },
    { name: "Tutorials", icon: BookOpen },
    { name: "Blog", icon: TrendingUp },
    { name: "Community", icon: Users },
    { name: "API Documentation", icon: Shield },
  ];

  const legal = [
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Risk Disclosure", path: "/risk" },
    { name: "AML Policy", path: "/aml" },
  ];

  const paymentMethods = [
    { name: "Visa", icon: CreditCard },
    { name: "Mastercard", icon: CreditCard },
    { name: "M-Pesa", icon: DollarSign },
    { name: "USDC", icon: DollarSign },
    { name: "Bitcoin", icon: DollarSign },
  ];

  return (
    <footer className="relative mt-20 bg-[#121212] text-white border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#199D69] rounded-lg flex items-center justify-center">
              <Zap className="text-white" size={18} />
            </div>
            <span className="text-xl font-bold text-[#199D69]">
              TradeX
            </span>
          </div>

          <p className="text-gray-400 text-sm">
            Next generation trading platform with fast execution and high payouts.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <Link className="text-gray-400 hover:text-[#199D69]" to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            {resources.map((item, i) => {
              const Icon = item.icon;
              return (
                <li key={i} className="flex items-center gap-2 text-gray-400">
                  <Icon size={14} />
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            {legal.map((item, i) => (
              <li key={i}>
                <Link className="text-gray-400 hover:text-[#199D69]" to={item.path}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>

          <div className="space-y-3 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={14} /> support@tradex.com
            </div>

            <div className="flex items-center gap-2">
              <Phone size={14} /> +1 800 123 456
            </div>

            <div className="flex items-center gap-2">
              <Clock size={14} /> 24/7 Support
            </div>
          </div>

          <h3 className="font-semibold mt-6 mb-2">Payments</h3>

          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((m, i) => {
              const Icon = m.icon;
              return (
                <div
                  key={i}
                  className="text-xs px-2 py-1 bg-[#1e1e1e] rounded flex items-center gap-1 text-gray-400"
                >
                  <Icon size={12} />
                  {m.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#2a2a2a] text-center py-4 text-gray-500 text-xs">
        © {currentYear} TradeX. All rights reserved.
      </div>

      {/* Support Button */}
      <div className="fixed bottom-5 right-5">
        <button className="w-12 h-12 rounded-full bg-[#199D69] flex items-center justify-center">
          <Headphones size={18} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;