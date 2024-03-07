import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "./../../public/fonts/Lora-Regular.ttf",
});

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <main className="h-full bg-gradient-to-br from-amber-100/50  to-yellow-100/50 backdrop-blur-sm flex flex-row">
        <div className="w-[50%] flex items-center justify-center">
          <p
            className={cn(
              "text-9xl font-thin select-none",
              headingFont.className,
            )}
          >
            libriflow
          </p>
        </div>
        <div className="w-[50%] bg-white justify-center items-center flex">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
