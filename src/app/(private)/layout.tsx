import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { nextAuthOptions } from "@/lib/auth";

import { Header } from "@/components/Header";

type PrivateLayout = {
  children: React.ReactNode;
}

export default async function PrivateLayout({
  children,
}: PrivateLayout) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-slate-900">
      <Header />
      <main className="flex flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}
