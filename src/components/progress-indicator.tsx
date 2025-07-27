import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

//const STEP_LABELS = ["Go Version", "Application", "Frameworks", "Advanced", "Configuration", "Generate"];
//TODO
const STEP_LABELS = ["Go Version", "Application", "Generate"];

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-2 md:space-x-4 lg:space-x-6">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={stepNumber} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                    {
                      "bg-emerald-500 text-white": isCompleted,
                      "bg-blue-500 text-white": isCurrent,
                      "bg-slate-200 text-slate-500": isUpcoming,
                    }
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </div>
                <span
                  className={cn(
                    "ml-2 text-xs md:text-sm font-medium hidden sm:block",
                    {
                      "text-emerald-600": isCompleted,
                      "text-blue-600": isCurrent,
                      "text-slate-500": isUpcoming,
                    }
                  )}
                >
                  {STEP_LABELS[index]}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div className="flex-1 h-0.5 bg-slate-200 mx-2 md:mx-4 lg:mx-6">
                  <div
                    className={cn(
                      "h-full bg-blue-500 transition-all duration-500",
                      isCompleted ? "w-full" : "w-0"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
