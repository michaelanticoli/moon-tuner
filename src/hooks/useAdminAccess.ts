import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { isCreator } from "@/lib/creatorAccess";
import { supabase } from "@/lib/supabase";

type RoleRow = { role: "admin" | "moderator" | "user" };

export function useAdminAccess() {
  const { user, loading: authLoading } = useAuth();
  const [roleLoading, setRoleLoading] = useState(true);
  const [hasAdminRole, setHasAdminRole] = useState(false);

  const creatorAccess = useMemo(() => isCreator(user?.email), [user?.email]);

  useEffect(() => {
    let cancelled = false;

    const loadRole = async () => {
      if (authLoading) return;

      if (!user || user.is_anonymous) {
        setHasAdminRole(false);
        setRoleLoading(false);
        return;
      }

      setRoleLoading(true);
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      if (cancelled) return;

      if (error) {
        console.warn("Unable to read account role.", error.message);
        setHasAdminRole(false);
      } else {
        setHasAdminRole(((data as RoleRow[] | null) ?? []).some((row) => row.role === "admin"));
      }
      setRoleLoading(false);
    };

    void loadRole();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user]);

  return {
    isAdmin: creatorAccess || hasAdminRole,
    loading: authLoading || roleLoading,
    source: hasAdminRole ? "role" : creatorAccess ? "creator" : null,
  } as const;
}