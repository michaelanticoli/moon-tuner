import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lock, Sparkles } from "lucide-react";
import { useState, ReactNode } from "react";

interface PaywallGateProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
}

export function PaywallGate({ isOpen, onClose, onUnlock }: PaywallGateProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif text-xl">
            <Lock className="w-5 h-5" />
            Premium Content
          </DialogTitle>
          <DialogDescription>
            Unlock the complete MOONtuner Education System to access all 96 lunar-zodiac combinations, 
            interactive flashcards, workbook exercises, assessments, and progress tracking.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Full Access Includes:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Interactive flashcard system for all 96 combinations</li>
              <li>• Complete lunar-zodiac matrix explorer</li>
              <li>• Guided workbook exercises</li>
              <li>• Knowledge assessments with instant feedback</li>
              <li>• Progress tracking and milestones</li>
            </ul>
          </div>

          <Button className="w-full" size="lg" onClick={onUnlock}>
            <Sparkles className="w-4 h-4 mr-2" />
            Unlock Full Access
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Demo mode: Click to unlock for free preview
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface PremiumOverlayProps {
  children: ReactNode;
  onUnlock: () => void;
}

export function PremiumOverlay({ children, onUnlock }: PremiumOverlayProps) {
  const [showPaywall, setShowPaywall] = useState(false);

  return (
    <div className="relative">
      {/* Blurred content preview */}
      <div className="filter blur-sm pointer-events-none select-none">
        {children}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <Lock className="w-12 h-12 mx-auto mb-4 text-foreground" />
          <h3 className="font-serif text-2xl text-foreground mb-2">Premium Content</h3>
          <p className="text-muted-foreground mb-6">
            This section is available to premium members. Unlock to access the complete learning experience.
          </p>
          <Button size="lg" onClick={() => setShowPaywall(true)}>
            <Sparkles className="w-4 h-4 mr-2" />
            Unlock Access
          </Button>
        </div>
      </div>

      <PaywallGate 
        isOpen={showPaywall} 
        onClose={() => setShowPaywall(false)}
        onUnlock={() => {
          setShowPaywall(false);
          onUnlock();
        }}
      />
    </div>
  );
}
