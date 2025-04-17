
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ResourcePackUploaderProps {
  label: string;
}

const ResourcePackUploader = ({ label }: ResourcePackUploaderProps) => {
  return (
    <div className="mb-6">
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <div className="flex flex-col gap-4">
        <div className="w-full p-4 border-2 border-dashed border-gray-700 rounded-lg bg-gray-800/50 hover:border-ender-purple/50 transition-colors duration-300 cursor-pointer group min-h-[160px] flex flex-col items-center justify-center">
          <Upload className="w-8 h-8 mb-2 text-gray-500 group-hover:text-ender-purple" />
          <p className="text-sm text-gray-500 group-hover:text-gray-400">
            <span className="font-semibold">Drop your file here</span> or click to upload
          </p>
          <p className="text-xs text-gray-500">.zip files only (max. 50MB)</p>
          <input 
            type="file" 
            className="hidden" 
            accept=".zip"
            aria-label="File upload"
          />
        </div>
        <Button 
          variant="outline" 
          className="w-full bg-gray-800/50 hover:bg-ender-purple/10 border-gray-700 text-gray-300"
        >
          <Upload className="w-4 h-4 mr-2" />
          Select File
        </Button>
      </div>
    </div>
  );
};

export default ResourcePackUploader;
