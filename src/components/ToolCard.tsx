
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon, Upload, Download, Copy, CheckCircle, Loader2 } from "lucide-react";
import ResourcePackUploader from "./ResourcePackUploader";
import { mergeResourcePacks, generateDownloadLink, generateSHA1Hash } from "@/utils/api";
import { toast } from "sonner";

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  buttonText: string;
}

const ToolCard = ({ id, title, description, icon: Icon, buttonText }: ToolCardProps) => {
  // State for file uploads and processing
  const [pack1File, setPack1File] = useState<File | null>(null);
  const [pack2File, setPack2File] = useState<File | null>(null);
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  // State for results
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [sha1Hash, setSha1Hash] = useState<string | null>(null);
  
  // Handle file uploads
  const handleFileSelected = (file: File, fileNumber?: number) => {
    if (id === "merge-tool") {
      if (fileNumber === 1) {
        setPack1File(file);
      } else if (fileNumber === 2) {
        setPack2File(file);
      }
    } else {
      setSingleFile(file);
    }
  };
  
  // Handle copy to clipboard
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy to clipboard"));
  };
  
  // Process button click based on tool type
  const handleProcessButtonClick = async () => {
    setLoading(true);
    
    try {
      switch (id) {
        case "merge-tool":
          if (!pack1File || !pack2File) {
            toast.error("Please upload both resource packs");
            return;
          }
          
          const mergeResult = await mergeResourcePacks(pack1File, pack2File);
          setDownloadUrl(mergeResult.downloadUrl);
          toast.success("Resource packs merged successfully!");
          break;
          
        case "link-tool":
          if (!singleFile) {
            toast.error("Please upload a resource pack");
            return;
          }
          
          const linkResult = await generateDownloadLink(singleFile);
          setDownloadUrl(linkResult.downloadUrl);
          toast.success("Download link generated successfully!");
          break;
          
        case "hash-tool":
          if (!singleFile) {
            toast.error("Please upload a resource pack");
            return;
          }
          
          const hashResult = await generateSHA1Hash(singleFile);
          setSha1Hash(hashResult.sha1Hash);
          toast.success("SHA-1 hash generated successfully!");
          break;
      }
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Reset the tool state
  const handleReset = () => {
    setPack1File(null);
    setPack2File(null);
    setSingleFile(null);
    setDownloadUrl(null);
    setSha1Hash(null);
  };
  
  // Render tool content based on tool type
  const renderToolContent = () => {
    // For the Merge Tool
    if (id === "merge-tool") {
      return (
        <>
          <ResourcePackUploader 
            label="Resource Pack 1" 
            onFileSelected={(file) => handleFileSelected(file, 1)}
          />
          <ResourcePackUploader 
            label="Resource Pack 2" 
            onFileSelected={(file) => handleFileSelected(file, 2)}
          />
          
          {downloadUrl ? (
            <div className="mt-4 text-center">
              <p className="text-green-500 mb-3">Resource packs merged successfully!</p>
              <a 
                href={downloadUrl}
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md mb-3 transition-colors"
                download
              >
                <Download className="w-5 h-5" />
                Download Merged Pack
              </a>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleReset}
              >
                Merge Another Pack
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full bg-ender-purple hover:bg-ender-purple/90 text-ender-dark transition-all duration-200 font-medium py-5 animate-pulse-glow"
              style={{ "--glow-color": "rgba(155, 135, 245, 0.2)" } as React.CSSProperties}
              onClick={handleProcessButtonClick}
              disabled={!pack1File || !pack2File || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Merging...
                </>
              ) : (
                buttonText
              )}
            </Button>
          )}
        </>
      );
    }
    
    // For Link Generator and SHA-1 Hash Generator
    else {
      return (
        <>
          <div className="mb-6">
            <ResourcePackUploader 
              label={id === "link-tool" ? "Resource Pack" : "Resource Pack or Server file"} 
              onFileSelected={handleFileSelected}
            />
            
            {/* Result display for download link */}
            {id === "link-tool" && downloadUrl && (
              <div className="mt-4 p-4 bg-gray-800 rounded-md">
                <p className="text-sm text-gray-300 mb-2">Direct Download Link:</p>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={downloadUrl} 
                    className="flex-grow p-2 bg-gray-700 text-white text-sm rounded border border-gray-600 overflow-x-auto overflow-ellipsis"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleCopyToClipboard(downloadUrl)}
                    className="flex-shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Result display for SHA-1 hash */}
            {id === "hash-tool" && sha1Hash && (
              <div className="mt-4 p-4 bg-gray-800 rounded-md">
                <p className="text-sm text-gray-300 mb-2">SHA-1 Hash:</p>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={sha1Hash} 
                    className="flex-grow p-2 bg-gray-700 text-white text-sm rounded border border-gray-600 font-mono overflow-x-auto overflow-ellipsis"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleCopyToClipboard(sha1Hash)}
                    className="flex-shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {(downloadUrl || sha1Hash) ? (
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={handleReset}
            >
              Process Another File
            </Button>
          ) : (
            <Button 
              className="w-full bg-ender-purple hover:bg-ender-purple/90 text-ender-dark transition-all duration-200 font-medium py-5 animate-pulse-glow"
              style={{ "--glow-color": "rgba(155, 135, 245, 0.2)" } as React.CSSProperties}
              onClick={handleProcessButtonClick}
              disabled={!singleFile || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                buttonText
              )}
            </Button>
          )}
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
