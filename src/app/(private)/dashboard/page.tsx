import { getServerSession } from "next-auth";

import { nextAuthOptions } from "@/lib/auth";

import { SignOutButton } from "@/components/buttons/SignOutButton";

export default async function DashboardPage() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      <h1 className="text-white">Dashboard</h1>
    </>
  );
}
