import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Check } from "lucide-react";

interface EmailSubscribeFormProps {
  source?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export function EmailSubscribeForm({
  source = "website",
  placeholder = "your@email.com",
  buttonText = "Subscribe",
  className = "",
}: EmailSubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const { data, error } = await supabase.functions.invoke("subscribe-email", {
        body: { email: email.trim(), source },
      });

      if (error) throw error;

      if (data?.success) {
        setStatus("success");
        setMessage("You're in. Watch for the first transmission.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data?.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to subscribe. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-3 justify-center py-3 ${className}`}>
        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
          <Check className="w-4 h-4 text-accent" />
        </div>
        <span className="text-accent text-sm">{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <Input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder={placeholder}
        required
        className="bg-background/10 border-border/30 text-foreground placeholder:text-muted-foreground/50 h-11"
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-11 px-6 whitespace-nowrap"
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          buttonText
        )}
      </Button>
      {status === "error" && message && (
        <p className="text-destructive text-xs mt-1 sm:absolute sm:bottom-[-1.5rem]">{message}</p>
      )}
    </form>
  );
}
