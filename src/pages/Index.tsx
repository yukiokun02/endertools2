
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolCard from "@/components/ToolCard";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Package, Link as LinkIcon, Hash } from "lucide-react";

const Index = () => {
  const tools = [
    {
      id: "merge-tool",
      title: "Resource Pack Merger",
      description: "Combine multiple Minecraft resource packs into one effortlessly.",
      icon: Package,
      buttonText: "Merge Packs"
    },
    {
      id: "link-tool",
      title: "Direct Download Link Generator",
      description: "Upload and get an instant direct download URL for your server.",
      icon: LinkIcon,
      buttonText: "Generate Link"
    },
    {
      id: "hash-tool",
      title: "SHA-1 Hash Generator",
      description: "Instantly generate the SHA-1 hash required for your Minecraft resource pack.",
      icon: Hash,
      buttonText: "Generate SHA-1"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Tools Section */}
      <section id="tools" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our <span className="text-ender-purple">Tools</span></h2>
            <div className="h-1 w-20 bg-ender-purple mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
              Powerful utilities designed specifically for Minecraft server administrators. 
              Simple to use, yet highly effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <ToolCard 
                key={tool.id}
                id={tool.id}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                buttonText={tool.buttonText}
              />
            ))}
          </div>
        </div>
      </section>
      
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
