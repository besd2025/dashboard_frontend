import { SidebarProvider } from "../ui/context/SidebarContext";
import { ThemeProvider } from "../ui/context/ThemeContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies(); // ✅ obligatoire depuis 14.2
  const token = cookieStore.get("accessToken")?.value;
  if (!token) {
    redirect("/"); // redirige vers la page d'accueil si non connecté
  }

  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
