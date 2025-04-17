import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon, Upload } from "lucide-react";
import ResourcePackUploader from "./ResourcePackUploader";

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  buttonText: string;
}

const ToolCard = ({ id, title, description, icon: Icon, buttonText }: ToolCardProps) => {
  const renderToolContent = () => {
    switch (id) {
      case "merge-tool":
        return (
          <>
            <ResourcePackUploader label="Resource Pack 1" />
            <ResourcePackUploader label="Resource Pack 2" />
            <Button 
              className="w-full bg-ender-purple hover:bg-ender-purple/90 text-ender-dark transition-all duration-200 font-medium py-5 animate-pulse-glow"
              style={{ "--glow-color": "rgba(155, 135, 245, 0.2)" } as React.CSSProperties}
            >
              Generate Merged Resource Pack
            </Button>
          </>
        );
      default:
        return (
          <>
            <div className="group mb-6">
              <div className="w-full p-4 border-2 border-dashed border-gray-700 rounded-lg bg-gray-800/50 hover:border-ender-purple/50 transition-colors duration-300 cursor-pointer min-h-[160px] flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 mb-2 text-gray-500 group-hover:text-ender-purple" />
                <p className="text-sm text-gray-500 group-hover:text-gray-400">
                  <span className="font-semibold">Drop your file here</span> or click to upload
                </p>
                <p className="text-xs text-gray-500">.zip files only (max. 50MB)</p>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 bg-gray-800/50 hover:bg-ender-purple/10 border-gray-700 text-gray-300"
              >
                <Upload className="w-4 h-4 mr-2" />
                Select File
              </Button>
            </div>
            <Button 
              className="w-full bg-ender-purple hover:bg-ender-purple/90 text-ender-dark transition-all duration-200 font-medium py-5 animate-pulse-glow"
              style={{ "--glow-color": "rgba(155, 135, 245, 0.2)" } as React.CSSProperties}
            >
              {buttonText}
            </Button>
          </>
        );
    }
  };

  return (
    <div 
      id={id}
      className="card-gradient rounded-xl overflow-hidden card-hover border border-ender-purple/20 flex flex-col p-8 min-h-[600px] md:min-h-[650px]"
    >
      <div className="flex-grow">
        <div className="w-12 h-12 rounded-full bg-ender-purple/20 flex items-center justify-center mb-6 ender-glow">
          <Icon className="text-ender-purple" size={24} />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-gray-300 mb-8 text-lg">{description}</p>
        {renderToolContent()}
      </div>
    </div>
  );
};

export default ToolCard;
