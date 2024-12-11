import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "./_components/Navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const sesstion = await auth();
  return (
    <SessionProvider session={sesstion}>
      <div className="flex flex-col ">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
}
