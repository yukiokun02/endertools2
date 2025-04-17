
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  buttonText: string;
}

const ToolCard = ({ id, title, description, icon: Icon, buttonText }: ToolCardProps) => {
  return (
    <div 
      id={id}
      className="card-gradient rounded-xl overflow-hidden card-hover border border-ender-purple/20 flex flex-col"
    >
      <div className="p-6 flex-grow">
        <div className="w-12 h-12 rounded-full bg-ender-purple/20 flex items-center justify-center mb-5 ender-glow">
          <Icon className="text-ender-purple" size={24} />
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>
        
        <div className="w-full p-3 border-2 border-dashed border-gray-700 rounded-lg bg-gray-800/50 hover:border-ender-purple/50 transition-colors duration-300 mb-6 cursor-pointer group">
          <div className="flex flex-col items-center justify-center py-4">
            <svg className="w-8 h-8 mb-2 text-gray-500 group-hover:text-ender-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="text-sm text-gray-500 group-hover:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">.zip files only (max. 50MB)</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept=".zip"
            aria-label="File upload"
          />
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <Button 
          className="w-full bg-ender-purple hover:bg-ender-purple/90 text-ender-dark transition-all duration-200 font-medium py-3 animate-pulse-glow"
          style={{ "--glow-color": "rgba(155, 135, 245, 0.2)" } as React.CSSProperties}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ToolCard;
