import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface TelegramLoginButtonProps {
  onSuccess?: (user: TelegramUser) => void;
  onClose?: () => void;
}

export function TelegramLoginButton({ onSuccess, onClose }: TelegramLoginButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    // Expose the global callback that the Telegram widget calls
    (window as Record<string, unknown>).onTelegramAuth = async (user: TelegramUser) => {
      try {
        const { data, error } = await supabase.functions.invoke("telegram-auth", {
          body: user,
        });

        if (error) throw error;

        setTelegramUser(user);
        onSuccess?.(user);
        // Persist to sessionStorage so nav can show logged-in state across the session
        sessionStorage.setItem("tg_user", JSON.stringify(user));
      } catch (err) {
        console.error("Telegram auth error:", err);
      }
    };

    // Load the Telegram widget script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?23";
    script.async = true;
    script.setAttribute("data-telegram-login", "moontuner_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-userpic", "false");

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }

    return () => {
      delete (window as Record<string, unknown>).onTelegramAuth;
    };
  }, [onSuccess]);

  if (telegramUser) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
        <span className="font-sans text-xs font-medium text-foreground tracking-[0.1em]">
          {telegramUser.username ? `@${telegramUser.username}` : telegramUser.first_name}
        </span>
      </div>
    );
  }

  return <div ref={containerRef} className="telegram-widget-container" />;
}
