"use client";

import React from "react";
import { useSidebar, SidebarProvider } from "../../ui/context/SidebarContext";
import { ThemeProvider } from "../../ui/context/ThemeContext";
import AppSidebar from "../../ui/municipal/AppSidebar";
import Backdrop from "../../ui/municipal/Backdrop";
import AppHeader from "../../ui/municipal/AppHeader";

function AdminLayoutContent({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex bg-white/92 dark:bg-gray-900">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-[var(--breakpoint-2xl)] md:p-6 relative">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayoutContent;
