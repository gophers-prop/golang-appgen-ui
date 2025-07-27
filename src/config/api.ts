// API Configuration
// Update these values to point to your backend API

export const API_CONFIG = {
  // Your backend API base URL
  //baseUrl: process.env.VITE_API_URL || 'http://localhost:5000',
  //baseUrl: 'http://3.80.93.144:8080',
  baseUrl: 'https://literate-chainsaw-4qjw6gwj6q9f7xp6-8080.app.github.dev',
  // API endpoints that your backend should implement
  endpoints: {
    generate: '/generate',//api/
    download: '/api/download',
    stats: '/app-count',
  },
  
  // Request timeout in milliseconds
  timeout: 30000,
};

// Expected API interfaces for your backend
export interface GenerateRequest {
  goVersion: string;
  appType: string;
  framework: string;
  projectName: string;
 /*
  docker: boolean;
  compose: boolean;
  baseImage: string;
  dependencies: string[];
  projectName: string;
  packageName: string;
  description: string;
  author: string;
  license: string;
  // Optional advanced settings
  libraries?: string[];
  databases?: string[];
  environmentOptions?: string[];
  testingOptions?: string[];
  devopsOptions?: string[];
  monitoringOptions?: string[];*/
}

export interface GenerateResponse {
  success: boolean;
  downloadUrl?: string;
  error?: string;
}

export interface StatsResponse {
  totalGenerated: number;
}