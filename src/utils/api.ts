
import { toast } from "sonner";

// Base API URL - automatically detects development or production environment
const BASE_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

// Interface for API responses
interface ApiResponse<T> {
  success: boolean;
  message: string;
  [key: string]: any;
}

// Resource Pack Merger API
export const mergeResourcePacks = async (pack1: File, pack2: File): Promise<ApiResponse<{ downloadUrl: string, filename: string }>> => {
  try {
    const formData = new FormData();
    formData.append('pack1', pack1);
    formData.append('pack2', pack2);

    const response = await fetch(`${BASE_URL}/merge`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to merge resource packs');
    }

    return data;
  } catch (error) {
    toast.error(`Error merging resource packs: ${(error as Error).message}`);
    throw error;
  }
};

// Download Link Generator API
export const generateDownloadLink = async (file: File): Promise<ApiResponse<{ downloadUrl: string, filename: string }>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/generate-link`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to generate download link');
    }

    return data;
  } catch (error) {
    toast.error(`Error generating download link: ${(error as Error).message}`);
    throw error;
  }
};

// SHA-1 Hash Generator API
export const generateSHA1Hash = async (file: File): Promise<ApiResponse<{ sha1Hash: string, filename: string }>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/generate-sha1`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to generate SHA-1 hash');
    }

    return data;
  } catch (error) {
    toast.error(`Error generating SHA-1 hash: ${(error as Error).message}`);
    throw error;
  }
};
