import { ThemeProvider } from "@/components/providers/theme-provider";
import Sidebar from "@/components/sidebar";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-full bg-stone-100 dark:bg-zinc-800">
        <div className="h-full flex ">
          <div className="hidden md:flex h-full w-20 z-40 fixed">
            <Sidebar />
          </div>
          <div className="w-full md:pl-20 transition-all bg-stone-100 dark:bg-zinc-800">
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
