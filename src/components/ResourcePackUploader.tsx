
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ResourcePackUploaderProps {
  label: string;
  onFileSelected: (file: File) => void;
}

const ResourcePackUploader = ({ label, onFileSelected }: ResourcePackUploaderProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  // Process selected file
  const processFile = (file: File) => {
    if (!file.name.endsWith('.zip')) {
      toast.error("Only ZIP files are allowed");
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB
      toast.error("File size exceeds 50MB limit");
      return;
    }

    setSelectedFile(file);
    onFileSelected(file);
    toast.success(`${file.name} selected successfully`);
  };

  // Trigger file input click
  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="mb-6">
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <div className="flex flex-col gap-4">
        <div 
          className={`w-full p-6 border-2 border-dashed rounded-lg cursor-pointer min-h-[160px] flex flex-col items-center justify-center transition-colors duration-300 ${
            isDragActive 
              ? "border-ender-purple bg-ender-purple/10" 
              : selectedFile 
                ? "border-green-500/50 bg-green-500/10 hover:border-green-500/70" 
                : "border-gray-700 bg-gray-800/50 hover:border-ender-purple/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          {selectedFile ? (
            <>
              <Check className="w-8 h-8 mb-3 text-green-500" />
              <p className="text-sm font-semibold text-green-500">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-400">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </>
          ) : (
            <>
              <Upload className={`w-8 h-8 mb-3 ${isDragActive ? "text-ender-purple" : "text-gray-500"}`} />
              <p className={`text-sm ${isDragActive ? "text-ender-purple font-medium" : "text-gray-500"}`}>
                <span className="font-semibold">Drop your file here</span> or click to upload
              </p>
              <p className="text-xs text-gray-500">.zip files only (max. 50MB)</p>
            </>
          )}
          <input 
            ref={inputRef}
            type="file" 
            className="hidden" 
            accept=".zip"
            onChange={handleFileChange}
            aria-label="File upload"
          />
        </div>
        <Button 
          variant="outline" 
          className="w-full bg-gray-800/50 hover:bg-ender-purple/10 border-gray-700 text-gray-300"
          onClick={handleUploadClick}
        >
          <Upload className="w-4 h-4 mr-2" />
          Select File
        </Button>
      </div>
    </div>
  );
};

export default ResourcePackUploader;
