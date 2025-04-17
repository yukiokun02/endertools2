
import React from "react";
import { Rocket, Bolt, Shield } from "lucide-react";

const AboutFeature = ({ icon: Icon, title, description }: { 
  icon: typeof Rocket, 
  title: string, 
  description: string 
}) => {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="mb-4 p-2 bg-ender-purple/20 rounded-lg ender-glow">
        <Icon size={24} className="text-ender-purple" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About <span className="text-ender-purple">Endertools</span></h2>
          <div className="h-1 w-20 bg-ender-purple mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-10 mb-16">
          <div className="md:w-1/2">
            <div className="card-gradient rounded-xl p-8 h-full border border-ender-purple/20">
              <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
              <p className="text-gray-300 mb-6">
                We build high-quality, user-friendly tools for Minecraft server administrators, 
                making technical tasks simple and accessible.
              </p>
              <p className="text-gray-300">
                Endertools is maintained and developed by <span className="text-ender-purple font-semibold">EnderHOST</span>, 
                with a focus on creating reliable utilities that streamline server management and enhance the gameplay experience.
              </p>
            </div>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-1 gap-8">
            <AboutFeature 
              icon={Rocket}
              title="Fast & Efficient"
              description="Our tools are optimized for speed and performance, processing your resource packs quickly." 
            />
            <AboutFeature 
              icon={Bolt}
              title="Easy to Use"
              description="Simple interfaces designed for both beginners and experienced server administrators." 
            />
            <AboutFeature 
              icon={Shield}
              title="Secure Processing"
              description="Your files are processed securely and not stored longer than necessary on our servers." 
            />
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-300">
            Looking for quality Minecraft server hosting? Check out our parent company
          </p>
          <a 
            href="https://www.enderhost.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-ender-purple hover:text-ender-accent font-semibold text-lg inline-flex items-center gap-1 mt-2 transition-colors duration-200"
          >
            EnderHOST <span className="text-xs">↗</span>
          </a>
        </div>
      </div>
      
      {/* Background effect */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none opacity-30">
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-ender-purple/10 to-transparent"></div>
      </div>
    </section>
  );
};

export default About;
