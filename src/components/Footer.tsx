
import React from "react";
import { Button } from "@/components/ui/button";
import { Package, Link as LinkIcon, Hash, ChevronRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ender-darker pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div>
            <a href="#" className="flex items-center mb-6">
              <span className="text-2xl font-bold text-white tracking-tight">
                <span className="text-ender-purple">Ender</span>Tools
              </span>
            </a>
            <p className="text-gray-400 mb-6">
              Powerful utilities designed to make managing your Minecraft server easier.
              Built by server admins, for server admins.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-ender-purple transition-colors duration-200"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-ender-purple transition-colors duration-200"
              >
                <span className="sr-only">Discord</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.885-.608 1.286a18.566 18.566 0 0 0-5.487 0 12.217 12.217 0 0 0-.617-1.287.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 14.337 14.337 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.146 13.146 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#merge-tool" 
                  className="text-gray-400 hover:text-ender-purple flex items-center gap-2 transition-colors duration-200 group"
                >
                  <Package size={16} />
                  <span>Resource Pack Merger</span>
                  <ChevronRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                </a>
              </li>
              <li>
                <a 
                  href="#link-tool" 
                  className="text-gray-400 hover:text-ender-purple flex items-center gap-2 transition-colors duration-200 group"
                >
                  <LinkIcon size={16} />
                  <span>Direct Download Link Generator</span>
                  <ChevronRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                </a>
              </li>
              <li>
                <a 
                  href="#hash-tool" 
                  className="text-gray-400 hover:text-ender-purple flex items-center gap-2 transition-colors duration-200 group"
                >
                  <Hash size={16} />
                  <span>SHA-1 Hash Generator</span>
                  <ChevronRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Host With EnderHOST</h3>
            <p className="text-gray-400 mb-6">
              Experience premium Minecraft server hosting with excellent support, 
              high-performance hardware, and competitive pricing.
            </p>
            <Button 
              className="bg-ender-purple hover:bg-ender-purple/90 text-ender-dark transition-all duration-200 font-medium w-full"
              onClick={() => window.open("https://www.enderhost.in", "_blank")}
            >
              Host Your Server Now
            </Button>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} EnderHOST. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-ender-purple text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-ender-purple text-sm transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background effect */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-ender-purple/5 rounded-full filter blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
