import LoginForm from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-[50%] space-y-5">
      <p className="text-4xl font-extralight">Login</p>
      <LoginForm />
      <Button variant="link" className="font-normal w-full" size="sm" asChild>
        <Link href={"/register"}>{"Don't have an account?"}</Link>
      </Button>
    </div>
  );
}
