import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-[50%] space-y-5">
      <p className="text-4xl font-extralight">Create an account</p>
      <RegisterForm />
      <Button variant="link" className="font-normal w-full" size="sm" asChild>
        <Link href={"/login"}>{"Already have an account?"}</Link>
      </Button>
    </div>
  );
}
