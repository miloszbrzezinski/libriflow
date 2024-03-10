import MobileBar from "@/components/mobile-bar";
import Navbar from "@/components/navbar";
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
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="h-full bg-stone-100">
        <div className="h-full md:flex ">
          <div className="hidden md:flex h-full w-20 z-40 fixed">
            <Sidebar />
          </div>
          <div className="w-full md:pl-20 transition-all bg-stone-100 ">
            {children}
          </div>
          <div className="md:hidden w-full h-20 z-40 bottom-0 fixed">
            <MobileBar />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
