import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "./../../public/fonts/Lora-Regular.ttf",
});

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <main className="h-full bg-gradient-to-br from-amber-100/50  to-yellow-100/50 backdrop-blur-sm md:flex md:flex-row">
        <div className="md:w-[50%] md:h-full h-24 flex items-center justify-center">
          <p
            className={cn(
              "md:text-9xl text-6xl font-thin select-none text-slate-800",
              headingFont.className,
            )}
          >
            libriflow
          </p>
        </div>
        <div className="md:w-[50%] h-full bg-white justify-center items-center flex">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
