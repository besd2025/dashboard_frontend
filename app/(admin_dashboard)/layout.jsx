import { SidebarProvider } from "../ui/context/SidebarContext";
import { ThemeProvider } from "../ui/context/ThemeContext";
import { redirect } from "next/navigation";
import { UserProvider } from "../ui/context/UserContext";
export default async function AdminLayout({ children }) {
  // Vérifier si le token est présent dans le localStorage côté client
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      redirect("/"); // ou '/login'
    }
  }

  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
