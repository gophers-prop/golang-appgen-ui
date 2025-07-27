import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { StepProps, GenerateResponse } from "@/lib/types";

export function ProjectDetailsStep({ formData, updateFormData, onPrev, isValid }: StepProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

const generateMutation = useMutation({
  mutationFn: async (data: typeof formData) => {
    const response = await apiRequest("POST", "/generate", data);

    if (!response.ok) {
      const errorText = await response.text(); // In case API sends text error
      throw new Error(errorText || "Failed to generate file.");
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    return { success: true, downloadUrl };
  },

  onSuccess: (data) => {
    if (data.success && data.downloadUrl) {
      // Trigger file download
      const link = document.createElement('a');
      link.href = data.downloadUrl;
      link.download = "generated-project.zip"; // Optional: specify file name
      document.body.appendChild(link); // Required for Firefox
      link.click();
      link.remove();

      // Invalidate stats to update the counter
      queryClient.invalidateQueries({ queryKey: ['/app-count'] });

      toast({
        title: "Project Generated Successfully!",
        description: "Your Go application has been created and downloaded.",
      });
    } else {
      toast({
        title: "Generation Failed",
        description: "No download URL found",
        variant: "destructive",
      });
    }
  },

  onError: (error) => {
    toast({
      title: "Generation Failed",
      description: error.message || "Failed to generate project",
      variant: "destructive",
    });
  },
});

  const handleGenerate = () => {
    generateMutation.mutate(formData);
  };

  const getDockerSummary = () => {
    if (formData.docker && formData.compose) return "Docker + Compose";
    if (formData.docker) return "Docker only";
    return "Disabled";
  };

  const getFrameworkSummary = () => {
    if (formData.appType !== "web") return "N/A";
    const framework = formData.framework;
    switch (framework) {
      case "gin": return "Gin";
      case "echo": return "Echo";
      case "fiber": return "Fiber";
      case "gorilla": return "Gorilla Mux";
      case "none": return "Standard Library";
      default: return "Not selected";
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Project Details</h2>
        <p className="text-slate-600">Provide project metadata and generate your Go application</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <Label htmlFor="project-name">Project Name *</Label>
            <Input
              id="project-name"
              value={formData.projectName}
              onChange={(e) => updateFormData({ projectName: e.target.value })}
              placeholder="my-go-app"
              className="mt-2"
            />
            <p className="text-xs text-slate-500 mt-1">Used for module name and directory</p>
          </div>

          <div>
            <Label htmlFor="package-name">Package Name *</Label>
            <Input
              id="package-name"
              value={formData.packageName}
              onChange={(e) => updateFormData({ packageName: e.target.value })}
              placeholder="github.com/username/my-go-app"
              className="mt-2"
            />
            <p className="text-xs text-slate-500 mt-1">Go module path</p>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              placeholder="A brief description of your Go application"
              rows={3}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => updateFormData({ author: e.target.value })}
              placeholder="Your Name"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="license">License</Label>
            <Select value={formData.license} onValueChange={(value) => updateFormData({ license: value })}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select license" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No License</SelectItem>
                <SelectItem value="MIT">MIT License</SelectItem>
                <SelectItem value="Apache-2.0">Apache License 2.0</SelectItem>
                <SelectItem value="GPL-3.0">GNU GPL v3</SelectItem>
                <SelectItem value="BSD-3-Clause">BSD 3-Clause</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Configuration Summary */}
        <Card className="bg-slate-50 border-slate-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Configuration Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Go Version:</span>
              <span className="font-medium text-slate-900 ml-2">
                {formData.goVersion ? `Go ${formData.goVersion}` : "Not selected"}
              </span>
            </div>
            <div>
              <span className="text-slate-600">Application Type:</span>
              <span className="font-medium text-slate-900 ml-2">
                {formData.appType || "Not selected"}
              </span>
            </div>
            <div>
              <span className="text-slate-600">Framework:</span>
              <span className="font-medium text-slate-900 ml-2">
                {getFrameworkSummary()}
              </span>
            </div>
            <div>
              <span className="text-slate-600">Docker:</span>
              <span className="font-medium text-slate-900 ml-2">
                {getDockerSummary()}
              </span>
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
            onClick={handleGenerate}
            disabled={!isValid || generateMutation.isPending}
            className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3"
          >
            {generateMutation.isPending ? (
              <>Generating...</>
            ) : (
              <>
                <Download className="mr-2 w-4 h-4" />
                Generate & Download
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
