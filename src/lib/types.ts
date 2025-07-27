// Types for the Go Initializer Frontend

export interface FormState {
  goVersion: string;
  appType: string;
  framework?: string;
  projectName: string;
 /* docker: boolean;
  compose: boolean;
  baseImage: string;
  dependencies: string[];
  projectName: string;
  packageName: string;
  description: string;
  author: string;
  license: string;
  // Advanced settings
  libraries?: string[];
  databases?: string[];
  environmentOptions?: string[];
  testingOptions?: string[];
  devopsOptions?: string[];
  monitoringOptions?: string[];*/
}

export interface StepProps {
  formData: FormState;
  updateFormData: (updates: Partial<FormState>) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
}

export interface GoVersion {
  version: string;
  label: string;
  released: string;
  supported: boolean;
  lts?: boolean;
  description: string;
  badge?: string;
  badgeColor?: string;
  
}

export interface AppType {
  type: string;
  label: string;
  description: string;
  icon: string;
  iconColor: string;
  category: string;
  badge?: string;
  badgeColor?: string;
}

export interface Framework {
  framework: string;
  label: string;
  description: string;
  icon: string;
  iconColor: string;
  badge?: string;
  badgeColor?: string;
}

export interface Dependency {
  id: string;
  name: string;
  description: string;
  category: string;
  popular?: boolean;
}

// API Response Types
export interface GenerateResponse {
  success: boolean;
  downloadUrl?: string;
  error?: string;
}

export interface StatsResponse {
  totalGenerated: number;
}

// Go Versions Data
export const GO_VERSIONS: GoVersion[] = [
  { version: "1.22", label: "Go 1.22", released: "Feb 2024", supported: true, lts: true, description: "Latest",
    badge: "Popular",
    badgeColor: "bg-green-100 text-green-800" },
  { version: "1.21", label: "Go 1.21", released: "Aug 2023", supported: true, description: "Stable",
    badge: "Popular",
    badgeColor: "bg-green-100 text-green-800" },
  { version: "1.20", label: "Go 1.20", released: "Feb 2023", supported: true, description: "Supported",
    badge: "Popular",
    badgeColor: "bg-green-100 text-green-800" },
  { version: "1.19", label: "Go 1.19", released: "Aug 2022", supported: false, description: "not Supported",
    badge: "Popular",
    badgeColor: "bg-green-100 text-green-800" },
];

// Application Types Data
export const APP_TYPES: AppType[] = [
 /* {
    type: "web",
    label: "Web Application",
    description: "Full-stack web application with templates",
    icon: "🌐",
    iconColor: "bg-blue-100 text-blue-600",
    category: "Web",
    badge: "Popular",
    badgeColor: "bg-blue-100 text-blue-800"
  },*/
  {
    type: "webservice",
    label: "REST API",
    description: "RESTful web service",
    icon: "🔌",
    iconColor: "bg-green-100 text-green-600",
    category: "Web",
    badge: "Popular",
    badgeColor: "bg-green-100 text-green-800"
  },
  {
    type: "cli",
    label: "CLI Application",
    description: "Command-line interface tool",
    icon: "⌨️",
    iconColor: "bg-gray-100 text-gray-600",
    category: "CLI",
    badge: "Popular",
    badgeColor: "bg-gray-100 text-gray-800"
  },
 /* {
    type: "microservice",
    label: "Microservice",
    description: "Scalable microservice architecture",
    icon: "🔧",
    iconColor: "bg-purple-100 text-purple-600",
    category: "Backend",
  },
  {
    type: "worker",
    label: "Worker/Daemon",
    description: "Background processing service",
    icon: "⚙️",
    iconColor: "bg-orange-100 text-orange-600",
    category: "Backend",
  },
  {
    type: "graphql",
    label: "GraphQL API",
    description: "GraphQL server with schema",
    icon: "🎯",
    iconColor: "bg-pink-100 text-pink-600",
    category: "Web",
  },*/
 /* {
    type: "grpc",
    label: "gRPC Service",
    description: "High-performance RPC service",
    icon: "🚀",
    iconColor: "bg-indigo-100 text-indigo-600",
    category: "Backend",
  },
  {
    type: "websocket",
    label: "WebSocket Server",
    description: "Real-time communication server",
    icon: "📡",
    iconColor: "bg-teal-100 text-teal-600",
    category: "Web",
  },*/
 /* {
    type: "api-gateway",
    label: "API Gateway",
    description: "Service mesh API gateway",
    icon: "🌉",
    iconColor: "bg-cyan-100 text-cyan-600",
    category: "Backend",
  },
  {
    type: "library",
    label: "Library/Package",
    description: "Reusable Go library or package",
    icon: "📚",
    iconColor: "bg-yellow-100 text-yellow-600",
    category: "Library",
  },
  {
    type: "desktop",
    label: "Desktop Application",
    description: "Cross-platform desktop app",
    icon: "🖥️",
    iconColor: "bg-slate-100 text-slate-600",
    category: "Desktop",
  },
  {
    type: "database",
    label: "Database Tool",
    description: "Database utilities and tools",
    icon: "🗄️",
    iconColor: "bg-emerald-100 text-emerald-600",
    category: "Backend",
  },
  {
    type: "queue",
    label: "Message Queue",
    description: "Async message processing",
    icon: "📮",
    iconColor: "bg-red-100 text-red-600",
    category: "Backend",
  },
  {
    type: "cache",
    label: "Cache Service",
    description: "Distributed caching solution",
    icon: "⚡",
    iconColor: "bg-amber-100 text-amber-600",
    category: "Backend",
  },*/
];

// Frameworks Data
export const FRAMEWORKS: Framework[] = [
  {
    framework: "gin-gonic/gin",
    label: "Gin",
    description: "Fast HTTP web framework",
    icon: "🍸",
    iconColor: "bg-green-100 text-green-600",
    badge: "Popular",
    badgeColor: "bg-green-100 text-green-800"
  },
  {
    framework: "martini",
    label: "Martini",
    description: "High performance, minimalist framework",
    icon: "📢",
    iconColor: "bg-blue-100 text-blue-600",
    badge: "Fast",
    badgeColor: "bg-blue-100 text-blue-800"
  },
  {
    framework: "goji",
    label: "Goji",
    description: "Express-inspired web framework",
    icon: "🕸️",
    iconColor: "bg-purple-100 text-purple-600",
    badge: "Express-like",
    badgeColor: "bg-purple-100 text-purple-800"
  },
  /*{
    framework: "gorilla",
    label: "Gorilla Mux",
    description: "Powerful HTTP router and URL matcher",
    icon: "🦍",
    iconColor: "bg-gray-100 text-gray-600"
  },
  {
    framework: "none",
    label: "Standard Library",
    description: "Built-in net/http package",
    icon: "⚡",
    iconColor: "bg-yellow-100 text-yellow-600",
    badge: "Minimal",
    badgeColor: "bg-yellow-100 text-yellow-800"
  },*/
];

// Dependencies Data
export const DEPENDENCIES: Dependency[] = [
  {
    id: "gorm",
    name: "GORM",
    description: "The fantastic ORM library for Golang",
    category: "Database",
    popular: true
  },
  {
    id: "viper",
    name: "Viper",
    description: "Go configuration with fangs",
    category: "Configuration",
    popular: true
  },
  {
    id: "logrus",
    name: "Logrus",
    description: "Structured logger for Go",
    category: "Logging",
    popular: true
  },
  {
    id: "testify",
    name: "Testify",
    description: "Testing toolkit with common assertions",
    category: "Testing",
    popular: true
  },
  {
    id: "jwt",
    name: "JWT-Go",
    description: "JSON Web Tokens for Go",
    category: "Authentication"
  },
  {
    id: "redis",
    name: "Redis Client",
    description: "Type-safe Redis client",
    category: "Database"
  },
  {
    id: "prometheus",
    name: "Prometheus",
    description: "Monitoring and alerting toolkit",
    category: "Monitoring"
  },
  {
    id: "cobra",
    name: "Cobra",
    description: "CLI library for modern Go applications",
    category: "CLI"
  },
];