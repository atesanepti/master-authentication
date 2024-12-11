import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import LoginButton from "./../components/auth/LoginButton";
import { auth } from "@/auth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default async function Home() {
  const session = await auth();
  console.log("SESSION ", session);
  return (
    <main
      className={cn(
        "w-full h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 ",
        poppins.className
      )}
    >
      <div className="flex flex-col w-full h-full justify-center items-center ">
        <h2 className="text-white text-6xl drop-shadow-md text-center font-semibold">
          Auth
        </h2>
        <span className="text-lg text-white mt-4">
          A simple Authentication service
        </span>

        <LoginButton>
          <Button variant={"secondary"} className="mt-6">
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
