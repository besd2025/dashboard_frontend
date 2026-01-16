"use client";

import React, { useEffect, useState } from "react";
import { useSidebar } from "../../ui/context/SidebarContext";
import { ThemeProvider } from "../../ui/context/ThemeContext";
import AppSidebar from "../../ui/dashboard/AppSidebar";
import Backdrop from "../../ui/dashboard/Backdrop";
import AppHeader from "../../ui/dashboard/AppHeader";
import { UserProvider } from "../../ui/context/UserContext";
import { useRouter } from "next/navigation";

function AdminLayoutContent({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const router = useRouter();
  function DecodeToJwt(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Échec du décodage du token", error);
      return null;
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const now = new Date();
    if (!token) {
      router.replace("/");
    } else {
      const user = DecodeToJwt(token);
      if (now > new Date(user?.exp * 1000)) {
        localStorage.removeItem("accessToken");
        router.replace("/");
      } else {
        setIsAuthChecked(true);
      }
    }
  }, []);

  if (!isAuthChecked) {
    return;
  }

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <UserProvider>
      <div className="min-h-screen xl:flex bg-gray-200 dark:bg-gray-900">
        <AppSidebar />
        <Backdrop />
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
        >
          <AppHeader />
          <div className="p-4 mx-auto max-w-[var(--breakpoint-2xl)] md:p-2 relative">
            {children}
          </div>
        </div>
      </div>
    </UserProvider>
  );
}

export default AdminLayoutContent;
