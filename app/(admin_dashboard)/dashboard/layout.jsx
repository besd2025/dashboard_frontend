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

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/"); // redirige vers page d’accueil si non connecté
    } else {
      setIsAuthChecked(true); // Auth OK, on peut afficher la page
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
