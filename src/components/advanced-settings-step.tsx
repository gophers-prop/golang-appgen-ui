import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Settings, Shield, TestTube, Zap } from "lucide-react";
import type { StepProps } from "@/lib/types";

const ENVIRONMENT_OPTIONS = [
  { id: "env-files", label: ".env Configuration", description: "Environment variable files", icon: "⚙️" },
  { id: "config-viper", label: "Viper Config", description: "Advanced configuration management", icon: "🔧" },
  { id: "hot-reload", label: "Hot Reload (Air)", description: "Auto-restart on file changes", icon: "🔄" },
  { id: "graceful-shutdown", label: "Graceful Shutdown", description: "Handle shutdown signals properly", icon: "🛑" },
];

const TESTING_OPTIONS = [
  { id: "unit-tests", label: "Unit Tests", description: "Basic unit test structure", icon: "🧪" },
  { id: "integration-tests", label: "Integration Tests", description: "API integration testing", icon: "🔗" },
  { id: "testify", label: "Testify Suite", description: "Advanced testing framework", icon: "✅" },
  { id: "benchmarks", label: "Benchmarks", description: "Performance benchmark tests", icon: "⚡" },
];

const DEVOPS_OPTIONS = [
  { id: "github-actions", label: "GitHub Actions", description: "CI/CD workflow", icon: "🚀" },
  { id: "dockerfile", label: "Multi-stage Dockerfile", description: "Optimized container build", icon: "🐳" },
  { id: "makefile", label: "Makefile", description: "Build automation scripts", icon: "🛠️" },
  { id: "lint-config", label: "Linting Setup", description: "golangci-lint configuration", icon: "🎯" },
];

const MONITORING_OPTIONS = [
  { id: "health-checks", label: "Health Endpoints", description: "/health and /ready endpoints", icon: "💚" },
  { id: "prometheus", label: "Prometheus Metrics", description: "Application metrics", icon: "📊" },
  { id: "structured-logging", label: "Structured Logging", description: "JSON structured logs", icon: "📝" },
  { id: "tracing", label: "Distributed Tracing", description: "OpenTelemetry integration", icon: "🔍" },
];

export function AdvancedSettingsStep({ formData, updateFormData, onNext, onPrev }: StepProps) {
  const handleToggle = (category: string, optionId: string, enabled: boolean) => {
    const currentOptions = (formData as any)[category] || [];
    const newOptions = enabled 
      ? [...currentOptions, optionId]
      : currentOptions.filter((opt: string) => opt !== optionId);
    updateFormData({ [category]: newOptions } as any);
  };

  const environmentOptions = (formData as any).environmentOptions || [];
  const testingOptions = (formData as any).testingOptions || [];
  const devopsOptions = (formData as any).devopsOptions || [];
  const monitoringOptions = (formData as any).monitoringOptions || [];

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Advanced Settings</h2>
        <p className="text-slate-600">Configure development tools, testing, and deployment options</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Environment & Development */}
          <div>
            <div className="flex items-center mb-4">
              <Settings className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-slate-900">Environment & Development</h3>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin pr-2">
              {ENVIRONMENT_OPTIONS.map((option) => (
                <Card key={option.id} className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">{option.icon}</span>
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">{option.label}</h4>
                        <p className="text-xs text-slate-600">{option.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={environmentOptions.includes(option.id)}
                      onCheckedChange={(checked) => handleToggle('environmentOptions', option.id, checked)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Testing & Quality */}
          <div>
            <div className="flex items-center mb-4">
              <TestTube className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-slate-900">Testing & Quality</h3>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin pr-2">
              {TESTING_OPTIONS.map((option) => (
                <Card key={option.id} className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">{option.icon}</span>
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">{option.label}</h4>
                        <p className="text-xs text-slate-600">{option.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={testingOptions.includes(option.id)}
                      onCheckedChange={(checked) => handleToggle('testingOptions', option.id, checked)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* DevOps & CI/CD */}
          <div>
            <div className="flex items-center mb-4">
              <Zap className="w-5 h-5 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-slate-900">DevOps & CI/CD</h3>
            </div>
            <div className="space-y-3">
              {DEVOPS_OPTIONS.map((option) => (
                <Card key={option.id} className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">{option.icon}</span>
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">{option.label}</h4>
                        <p className="text-xs text-slate-600">{option.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={devopsOptions.includes(option.id)}
                      onCheckedChange={(checked) => handleToggle('devopsOptions', option.id, checked)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Monitoring & Observability */}
          <div>
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-orange-600 mr-2" />
              <h3 className="text-lg font-semibold text-slate-900">Monitoring & Observability</h3>
            </div>
            <div className="space-y-3">
              {MONITORING_OPTIONS.map((option) => (
                <Card key={option.id} className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">{option.icon}</span>
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">{option.label}</h4>
                        <p className="text-xs text-slate-600">{option.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={monitoringOptions.includes(option.id)}
                      onCheckedChange={(checked) => handleToggle('monitoringOptions', option.id, checked)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Go Version Specific Options */}
        <Card className="bg-blue-50 border-blue-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Go Version Specific Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Module Proxy</label>
              <Select defaultValue="direct">
                <SelectTrigger>
                  <SelectValue placeholder="Select module proxy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">Direct (GOPROXY=direct)</SelectItem>
                  <SelectItem value="proxy">Go Proxy (proxy.golang.org)</SelectItem>
                  <SelectItem value="custom">Custom Proxy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Build Mode</label>
              <Select defaultValue="default">
                <SelectTrigger>
                  <SelectValue placeholder="Select build mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="static">Static Binary</SelectItem>
                  <SelectItem value="optimized">Size Optimized</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

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
            Continue to Configuration
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}