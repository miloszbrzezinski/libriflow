import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "./../../../public/fonts/IstokWeb-Regular.ttf",
});

const SettingsPage = () => {
  return (
    <div className="flex w-full h-full bg-gradient-to-br from-slate-300  to-amber-100 backdrop-blur-sm p-5">
      <Navbar title="settings" />
    </div>
  );
};

export default SettingsPage;
