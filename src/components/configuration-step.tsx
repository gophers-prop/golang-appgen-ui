import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DEPENDENCIES } from "@/lib/types";
import type { StepProps } from "@/lib/types";

export function ConfigurationStep({ formData, updateFormData, onNext, onPrev }: StepProps) {
  const handleDependencyToggle = (depId: string, checked: boolean) => {
    const newDependencies = checked
      ? [...formData.dependencies, depId]
      : formData.dependencies.filter((d) => d !== depId);
    updateFormData({ dependencies: newDependencies });
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Project Configuration</h2>
        <p className="text-slate-600">Configure Docker, dependencies, and project details</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Docker Configuration */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Docker Configuration</h3>
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-lg">
                      🐳
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Include Dockerfile</h4>
                      <p className="text-sm text-slate-600">Multi-stage Docker build</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.docker}
                    onCheckedChange={(checked) => updateFormData({ docker: checked })}
                  />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 text-lg">
                      📦
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Docker Compose</h4>
                      <p className="text-sm text-slate-600">Include compose.yml</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.compose}
                    onCheckedChange={(checked) => updateFormData({ compose: checked })}
                  />
                </div>
              </Card>

              <Card className="p-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Base Image</label>
                <Select value={formData.baseImage} onValueChange={(value) => updateFormData({ baseImage: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select base image" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alpine">Alpine Linux (smallest)</SelectItem>
                    <SelectItem value="ubuntu">Ubuntu (more compatible)</SelectItem>
                    <SelectItem value="scratch">Scratch (minimal)</SelectItem>
                  </SelectContent>
                </Select>
              </Card>
            </div>
          </div>

          {/* Dependencies */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Additional Dependencies</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin pr-2">
              {DEPENDENCIES.map((dep) => (
                <Card key={dep.id} className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={formData.dependencies.includes(dep.id)}
                      onCheckedChange={(checked) => handleDependencyToggle(dep.id, checked as boolean)}
                    />
                    <div>
                      <h4 className="text-sm font-medium text-slate-900">{dep.label}</h4>
                      <p className="text-xs text-slate-600">{dep.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
            Continue to Project Details
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
