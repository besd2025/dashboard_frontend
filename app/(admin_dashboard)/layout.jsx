import { SidebarProvider } from "../ui/context/SidebarContext";
import { ThemeProvider } from "../ui/context/ThemeContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function AdminLayout({ children }) {
  // const cookieStore = cookies();

  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
