import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_TYPES, FRAMEWORKS } from "@/lib/types";
import type { StepProps } from "@/lib/types";

export function AppTypeStep({ formData, updateFormData, onNext, onPrev, isValid }: StepProps) {
  const isWebApp = formData.appType === "webservice" || formData.appType === "api-gateway" || 
                   formData.appType === "graphql" || formData.appType === "websocket" || 
                   formData.appType === "grpc";

  // Group application types by category
  const groupedTypes = APP_TYPES.reduce((acc, type) => {
    const category = type.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(type);
    return acc;
  }, {} as Record<string, typeof APP_TYPES>);

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Type & Framework</h2>
        <p className="text-slate-600">Choose your application type and preferred framework</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Application Type */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Application Type</h3>
            <div className="max-h-96 overflow-y-auto pr-2 space-y-4 scrollbar-thin">
              {Object.entries(groupedTypes).map(([category, types]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium text-slate-700 mb-2 px-2">{category}</h4>
                  <div className="space-y-2">
                    {types.map((type) => (
                      <Card
                        key={type.type}
                        className={cn(
                          "p-3 cursor-pointer hover:border-blue-500 transition-all duration-200 border-2",
                          formData.appType === type.type
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200"
                        )}
                        onClick={() => updateFormData({ appType: type.type,framework: "" })}
                      >
                        <div className="flex items-center">
                          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mr-3 text-lg", type.iconColor)}>
                            {type.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900 text-sm">{type.label}</h4>
                            <p className="text-xs text-slate-600">{type.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Framework Selection */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Framework <span className="text-sm font-normal text-slate-500">(for Selected Application Type)</span>
            </h3>
           <div className="space-y-3">
  {FRAMEWORKS
    .filter(fw => fw.appTypes.includes(formData.appType))
    .map((framework) => (
      <Card
        key={framework.framework}
        className={cn(
          "p-4 cursor-pointer hover:border-blue-500 transition-all duration-200 border-2",
          formData.framework === framework.framework
            ? "border-blue-500 bg-blue-50"
            : "border-slate-200"
        )}
        onClick={() => updateFormData({ framework: framework.framework })}
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
            disabled={!isValid}
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
