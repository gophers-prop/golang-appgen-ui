import { useState } from "react";
import { Card } from "@/components/ui/card";
//import { Badge } from "@/components/ui/badge";
import { SiGo } from "react-icons/si";
import { Github, HelpCircle, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ProgressIndicator } from "@/components/progress-indicator";
import { GoVersionStep } from "@/components/go-version-step";
import { AppTypeStep } from "@/components/app-type-step";
//import { FrameworksStep } from "@/components/frameworks-step";
//import { AdvancedSettingsStep } from "@/components/advanced-settings-step";
//import { ConfigurationStep } from "@/components/configuration-step";
import { ProjectDetailsStep } from "@/components/project-details-step";
import type { FormState } from "@/lib/types";

//const TOTAL_STEPS = 6;
//TODO
const TOTAL_STEPS = 3;

export default function Home() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormState>({
    goVersion: "",
    appType: "",
    framework: "",
    projectName: "",
    moduleName: "",
   /* docker: false,
    compose: false,
    baseImage: "alpine",
    dependencies: [],
    projectName: "",
    
    description: "",
    author: "",
    license: "none",*/
  });

  // Fetch total generated count
  const { data: stats } = useQuery<{ totalGenerated: number }>({
    queryKey: ['/api/app-count'],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const updateFormData = (updates: Partial<FormState>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStep1Valid = () => Boolean(formData.goVersion);
  const isStep2Valid = () => Boolean(formData.appType);
  const isStep3Valid = () => {
    const isWebApp = formData.appType === "web" || formData.appType === "api-gateway" || 
                     formData.appType === "graphql" || formData.appType === "websocket" || 
                     formData.appType === "grpc";
    return !isWebApp || Boolean(formData.framework);
  };
  const isStep4Valid = () => true; // Advanced settings are optional
  const isStep5Valid = () => true; // Configuration step is always valid
  const isStep6Valid = () => Boolean(formData.projectName );//&& formData.moduleName

  const getCurrentStepValidation = () => {
    switch (currentStep) {
      case 1: return isStep1Valid();
      case 2: return isStep2Valid();
      case 3: return isStep3Valid();
      case 4: return isStep4Valid();
      case 5: return isStep5Valid();
      case 6: return isStep6Valid();
      default: return false;
    }
  };

  const stepProps = {
    formData,
    updateFormData,
    onNext: nextStep,
    onPrev: prevStep,
    isValid: getCurrentStepValidation(),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-go-blue rounded-lg flex items-center justify-center">
                <SiGo className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">GoXper</h1>
                <p className="text-sm text-slate-600">Build Go Apps With Platform Precision</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {stats?.totalGenerated !== undefined && (
                <div className="flex items-center bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                  <BarChart3 className="w-4 h-4 text-emerald-600 mr-2" />
                  <span className="text-sm font-medium text-emerald-700">
                    {stats.totalGenerated.toLocaleString()}
                  </span>
                  <span className="text-xs text-emerald-600 ml-1">generated</span>
                </div>
              )}
             <a
                href="https://github.com/gophers-prop/golang-appgen/blob/master/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <button
                onClick={() => setHelpOpen(true)}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
                </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <Card className="bg-white shadow-lg border border-slate-200 overflow-hidden">
          {currentStep === 1 && <GoVersionStep {...stepProps} />}
          {currentStep === 2 && <AppTypeStep {...stepProps} />}
  
          {currentStep === 3 && <ProjectDetailsStep {...stepProps} />}
        </Card>
      </main>
      {helpOpen && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl relative">
      <button
        className="absolute top-2 right-2 text-slate-500 hover:text-slate-700"
        onClick={() => setHelpOpen(false)}
      >
        ✕
      </button>
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Need Help?</h2>
      <p className="text-slate-600 text-sm leading-relaxed">
        This tool helps you scaffold Go applications with precise control over versioning, app type,
        frameworks, and more. If you're stuck, visit our{" "}
        <a
          href="https://github.com/gophers-prop/golang-appgen/tree/master"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          GitHub Issues
        </a>{" "}
        page.
      </p>
    </div>
  </div>
)}
    </div>
  );
}
/*
TODO
        {currentStep === 3 && <FrameworksStep {...stepProps} />}
          {currentStep === 4 && <AdvancedSettingsStep {...stepProps} />}
          {currentStep === 5 && <ConfigurationStep {...stepProps} />}
*/