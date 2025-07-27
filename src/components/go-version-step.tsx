import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GO_VERSIONS } from "@/lib/types";
import type { StepProps } from "@/lib/types";

export function GoVersionStep({ formData, updateFormData, onNext, isValid }: StepProps) {
  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose Go Version</h2>
        <p className="text-slate-600">Select the Go version for your project</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {GO_VERSIONS.map((version) => (
            <Card
              key={version.version}
              className={cn(
                "p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-200 border-2",
                formData.goVersion === version.version
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200"
              )}
              onClick={() => updateFormData({ goVersion: version.version })}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold text-slate-900">{version.label}</span>
                <Badge className={version.badgeColor}>{version.badge}</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-4">{version.description}</p>
              <div className="text-xs text-slate-500 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {version.released}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={onNext} 
            disabled={!isValid}
            className="bg-blue-500 hover:bg-blue-600 px-8 py-3"
          >
            Continue to Application Type
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
