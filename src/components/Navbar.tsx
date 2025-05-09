
import React, { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Package, 
  Link as LinkIcon, 
  Hash 
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleToolsDropdown = () => {
    setIsToolsDropdownOpen(!isToolsDropdownOpen);
  };

  const toolItems = [
    {
      name: "Resource Pack Merger",
      icon: <Package size={18} />,
      href: "#merge-tool"
    },
    {
      name: "Direct Download Link Generator",
      icon: <LinkIcon size={18} />,
      href: "#link-tool"
    },
    {
      name: "SHA-1 Hash Generator",
      icon: <Hash size={18} />,
      href: "#hash-tool"
    }
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Main navbar - only this part gets the blur effect */}
      <div className={`transition-all duration-300 ${
        scrolled ? "glass-effect" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center">
                <span className="text-xl font-bold text-white tracking-tight">
                  <span className="text-ender-purple">Ender</span>Tools
                </span>
              </a>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  className="text-white hover:text-ender-purple px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Home
                </a>
                
                <div className="relative">
                  <button
                    onClick={toggleToolsDropdown}
                    className="text-white hover:text-ender-purple px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                  >
                    Tools
                    <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isToolsDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <div 
                    className={`absolute right-0 mt-2 w-60 rounded-md shadow-lg glass-effect ring-1 ring-ender-purple/30 focus:outline-none z-20 transition-all duration-200 origin-top transform ${
                      isToolsDropdownOpen 
                        ? "opacity-100 scale-100" 
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <div className="py-1">
                      {toolItems.map((tool, index) => (
                        <a
                          key={index}
                          href={tool.href}
                          className="text-white hover:bg-ender-purple/20 block px-4 py-3 text-sm flex items-center gap-2 transition-colors duration-200"
                          onClick={() => setIsToolsDropdownOpen(false)}
                        >
                          {tool.icon}
                          {tool.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                
                <a
                  href="#about"
                  className="text-white hover:text-ender-purple px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  About
                </a>
                
                <a
                  href="#contact"
                  className="text-white hover:text-ender-purple px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Contact
                </a>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-ender-purple focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, separate from navbar and with its own styling */}
      <div 
        className={`md:hidden transition-all duration-300 transform ${
          isMenuOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 glass-effect">
          <a
            href="#"
            className="text-white hover:bg-ender-purple/20 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          
          <div>
            <button
              onClick={toggleToolsDropdown}
              className="text-white hover:bg-ender-purple/20 w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between transition-all duration-200"
            >
              <span>Tools</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${isToolsDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            <div 
              className={`pl-4 space-y-1 mt-1 transition-all duration-200 ${
                isToolsDropdownOpen 
                  ? "max-h-48 opacity-100" 
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {toolItems.map((tool, index) => (
                <a
                  key={index}
                  href={tool.href}
                  className="text-white hover:bg-ender-purple/20 block px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {tool.icon}
                  {tool.name}
                </a>
              ))}
            </div>
          </div>
          
          <a
            href="#about"
            className="text-white hover:bg-ender-purple/20 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          
          <a
            href="#contact"
            className="text-white hover:bg-ender-purple/20 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
