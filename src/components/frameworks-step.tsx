import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { FRAMEWORKS } from "@/lib/types";
import type { StepProps } from "@/lib/types";

const ADDITIONAL_LIBRARIES = [
  { id: "middleware", label: "Common Middleware", description: "CORS, logging, recovery middleware", popular: true },
  { id: "validation", label: "Input Validation", description: "Request/response validation", popular: true },
  { id: "jwt", label: "JWT Authentication", description: "JSON Web Token auth middleware", popular: false },
  { id: "swagger", label: "API Documentation", description: "Swagger/OpenAPI docs generation", popular: true },
  { id: "rate-limiting", label: "Rate Limiting", description: "API rate limiting middleware", popular: false },
  { id: "websocket", label: "WebSocket Support", description: "Real-time communication support", popular: false },
  { id: "compression", label: "Response Compression", description: "Gzip/deflate compression", popular: false },
  { id: "security", label: "Security Headers", description: "Security-focused HTTP headers", popular: true },
];

const DATABASE_INTEGRATIONS = [
  { id: "gorm", label: "GORM", description: "Full-featured ORM library", icon: "🗄️" },
  { id: "sqlx", label: "SQLx", description: "SQL extensions for database/sql", icon: "📊" },
  { id: "migrate", label: "Go Migrate", description: "Database migration tool", icon: "🔄" },
  { id: "redis", label: "Redis Client", description: "Redis caching integration", icon: "⚡" },
];

export function FrameworksStep({ formData, updateFormData, onNext, onPrev, isValid }: StepProps) {
  const isWebApp = formData.appType === "web" || formData.appType === "api-gateway" || 
                   formData.appType === "graphql" || formData.appType === "websocket" || 
                   formData.appType === "grpc";

  const handleLibraryToggle = (libId: string, enabled: boolean) => {
    const currentLibs = (formData as any).libraries || [];
    const newLibs = enabled 
      ? [...currentLibs, libId]
      : currentLibs.filter((lib: string) => lib !== libId);
    updateFormData({ libraries: newLibs } as any);
  };

  const handleDatabaseToggle = (dbId: string, enabled: boolean) => {
    const currentDbs = (formData as any).databases || [];
    const newDbs = enabled 
      ? [...currentDbs, dbId]
      : currentDbs.filter((db: string) => db !== dbId);
    updateFormData({ databases: newDbs } as any);
  };

  const currentLibraries = (formData as any).libraries || [];
  const currentDatabases = (formData as any).databases || [];

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Frameworks & Libraries</h2>
        <p className="text-slate-600">Choose your framework and additional libraries</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Framework Selection */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Framework <span className="text-sm font-normal text-slate-500">(for web applications)</span>
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin pr-2">
              {FRAMEWORKS.map((framework) => (
                <Card
                  key={framework.framework}
                  className={cn(
                    "p-4 cursor-pointer hover:border-blue-500 transition-all duration-200 border-2",
                    !isWebApp && "opacity-50 cursor-not-allowed",
                    formData.framework === framework.framework && isWebApp
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200"
                  )}
                  onClick={() => isWebApp && updateFormData({ framework: framework.framework })}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mr-3 text-lg", framework.iconColor)}>
                        {framework.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">{framework.label}</h4>
                        <p className="text-xs text-slate-600">{framework.description}</p>
                      </div>
                    </div>
                    {framework.badge && (
                      <Badge className={framework.badgeColor}>{framework.badge}</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Libraries */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Additional Libraries</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin pr-2">
              {ADDITIONAL_LIBRARIES.map((lib) => (
                <Card key={lib.id} className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex items-center mr-3">
                        {lib.popular && <Star className="w-4 h-4 text-yellow-500 mr-1" />}
                        <div>
                          <h4 className="text-sm font-medium text-slate-900">{lib.label}</h4>
                          <p className="text-xs text-slate-600">{lib.description}</p>
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={currentLibraries.includes(lib.id)}
                      onCheckedChange={(checked) => handleLibraryToggle(lib.id, checked)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Database Integrations */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Database Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DATABASE_INTEGRATIONS.map((db) => (
              <Card key={db.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">{db.icon}</div>
                  <h4 className="font-medium text-slate-900 mb-1">{db.label}</h4>
                  <p className="text-xs text-slate-600 mb-3">{db.description}</p>
                  <Switch
                    checked={currentDatabases.includes(db.id)}
                    onCheckedChange={(checked) => handleDatabaseToggle(db.id, checked)}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button 
            variant="ghost" 
            onClick={onPrev}
            className="text-slate-600 hover:text-slate-900 px-6 py-3"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={onNext}
            className="bg-blue-500 hover:bg-blue-600 px-8 py-3"
          >
            Continue to Advanced Settings
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}