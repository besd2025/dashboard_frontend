import { SidebarProvider } from "../ui/context/SidebarContext";
import { ThemeProvider } from "../ui/context/ThemeContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }) {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    redirect("/"); // redirige vers la page d'accueil si non connecté
  }

  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
