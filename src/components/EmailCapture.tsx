import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface EmailCaptureProps {
  placeholder?: string;
  className?: string;
}

export const EmailCapture = ({
  placeholder = "your@email.com",
  className = "",
}: EmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading" || status === "success") return;
    setStatus("loading");

    try {
      const { error } = await supabase
        .from("subscribers")
        .insert([{ email: email.trim().toLowerCase() }]);
      if (error) throw error;
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error("Subscription error:", err);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={placeholder}
          required
          maxLength={254}
          disabled={status === "loading" || status === "success"}
          aria-label="Email address"
          className="px-4 py-3 bg-[#121212] border border-[#262626] rounded-lg text-[#EFECE7] placeholder:text-[#90897B] focus:outline-none focus:border-[#1DC9A6] flex-grow text-sm disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="px-6 py-3 rounded-lg text-[0.7rem] tracking-[0.2em] uppercase bg-[#1DC9A6] text-[#0A0A0A] font-medium transition-opacity hover:opacity-90 disabled:opacity-60 whitespace-nowrap"
        >
          {status === "loading"
            ? "Tuning..."
            : status === "success"
            ? "Subscribed"
            : "Subscribe"}
        </button>
      </div>

      {status === "success" && (
        <p className="mt-3 text-xs text-[#1DC9A6]">
          Your position is printed. Welcome to the signal.
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-xs text-[#E0674F]">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
};

export default EmailCapture;
