import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { nextAuthOptions } from "@/lib/auth";

type PublicLayout = {
  children: React.ReactNode;
}

export default async function PublicLayout({
  children,
}: PublicLayout) {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="w-full flex justify-center items-center flex-col min-h-screen bg-slate-900">
      {children}
    </main>
  );
}
