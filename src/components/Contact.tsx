
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Github, ExternalLink } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Contact Us</h2>
          <div className="h-1 w-20 bg-ender-purple mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Have suggestions for new tools or improvements? We'd love to hear from you. Send us a message or connect through our channels.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="card-gradient rounded-xl p-8 border border-ender-purple/20 overflow-hidden relative">
            <h3 className="text-xl font-bold mb-6 text-white">Send a Message</h3>
            
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">Your Name</label>
                <Input 
                  id="name"
                  className="bg-ender-darker border-gray-700 focus:border-ender-purple focus:ring-1 focus:ring-ender-purple/50 placeholder-gray-500 text-white"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">Email Address</label>
                <Input 
                  id="email"
                  type="email"
                  className="bg-ender-darker border-gray-700 focus:border-ender-purple focus:ring-1 focus:ring-ender-purple/50 placeholder-gray-500 text-white"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">Message</label>
                <Textarea 
                  id="message"
                  className="bg-ender-darker border-gray-700 focus:border-ender-purple focus:ring-1 focus:ring-ender-purple/50 placeholder-gray-500 text-white"
                  placeholder="Your message here..."
                  rows={4}
                />
              </div>
              
              <Button 
                type="button" 
                className="w-full bg-ender-purple hover:bg-ender-purple/90 text-ender-dark transition-all duration-200 font-medium py-5"
              >
                Send Message
              </Button>
            </form>
            
            {/* Background gradient */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-ender-purple/20 rounded-full filter blur-2xl"></div>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="card-gradient rounded-xl p-8 border border-ender-purple/20 h-1/2">
              <div className="flex items-start">
                <div className="p-3 bg-ender-purple/20 rounded-lg mr-4 ender-glow">
                  <Mail className="text-ender-purple" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Email Us</h4>
                  <p className="text-gray-300 mb-3">Questions or feedback about our tools</p>
                  <a 
                    href="mailto:support@enderhost.in" 
                    className="text-ender-purple hover:text-ender-accent transition-colors duration-200"
                  >
                    support@enderhost.in
                  </a>
                </div>
              </div>
            </div>
            
            <div className="card-gradient rounded-xl p-8 border border-ender-purple/20 h-1/2">
              <div className="flex flex-col h-full">
                <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a 
                    href="#" 
                    className="p-3 bg-gray-800 hover:bg-ender-purple/20 rounded-lg transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <Github size={18} className="text-gray-400 group-hover:text-ender-purple" />
                    <span className="text-gray-300 group-hover:text-white text-sm">GitHub</span>
                  </a>
                  <a 
                    href="#" 
                    className="p-3 bg-gray-800 hover:bg-ender-purple/20 rounded-lg transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <MessageSquare size={18} className="text-gray-400 group-hover:text-ender-purple" />
                    <span className="text-gray-300 group-hover:text-white text-sm">Discord</span>
                  </a>
                  <a 
                    href="https://www.enderhost.in" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 hover:bg-ender-purple/20 rounded-lg transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ExternalLink size={18} className="text-gray-400 group-hover:text-ender-purple" />
                    <span className="text-gray-300 group-hover:text-white text-sm">EnderHOST</span>
                  </a>
                </div>
                <div className="grow mt-4"></div>
                <p className="text-gray-400 text-sm mt-auto">
                  We usually respond within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
