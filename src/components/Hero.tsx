import React from "react";

const Hero = () => {
  return (
    <section className="py-24 flex items-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-ender-purple to-ender-accent">
              Free Minecraft
            </span>{" "}
            <br className="hidden sm:block" />
            Tools By EnderHOST
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
            Simple, handy utilities to help with your Minecraft server tasks.
            100% free and ready to use.
          </p>
          <div className="mt-8 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <a
                href="#tools"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-ender-dark bg-ender-purple hover:bg-ender-purple/90 md:py-4 md:text-lg md:px-10 transition-all duration-200 animate-pulse-glow"
                style={{ "--glow-color": "rgba(155, 135, 245, 0.3)" } as React.CSSProperties}
              >
                Try Our Free Tools
              </a>
              <a
                href="#about"
                className="flex items-center justify-center px-8 py-3 border border-ender-purple text-base font-medium rounded-md text-white bg-transparent hover:bg-ender-purple/10 md:py-4 md:text-lg md:px-10 transition-all duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ender-purple/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ender-accent/10 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
