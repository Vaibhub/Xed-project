"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "../hooks/useAuth";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const { isLoading, isError } = useMe({
    enabled: !!token,
  });

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    if (isError) {
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    if (!isLoading && token) {
      setAuthChecked(true);
    }
  }, [token, isLoading, isError, router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  // ✅ SAFE render
  return <>{children}</>;
}
