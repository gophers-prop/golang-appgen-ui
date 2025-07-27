import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, Download, Settings } from "lucide-react";

interface GenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage: "generating" | "success" | "error";
  progress: number;
  error?: string;
  onDownload?: () => void;
}

export function GenerationModal({ 
  isOpen, 
  onClose, 
  stage, 
  progress, 
  error, 
  onDownload 
}: GenerationModalProps) {
  if (stage === "generating") {
    return (
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Generating Your Project</h3>
            <p className="text-slate-600 mb-4">Please wait while we create your Go application...</p>
            <Progress value={progress} className="w-full" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (stage === "success") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Project Generated Successfully!</h3>
            <p className="text-slate-600 mb-6">Your Go application has been created and is ready for download.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={onDownload} className="flex-1 bg-blue-500 hover:bg-blue-600">
                <Download className="mr-2 w-4 h-4" />
                Download ZIP
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (stage === "error") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Generation Failed</h3>
            <p className="text-slate-600 mb-6">{error || "An error occurred while generating your project."}</p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
