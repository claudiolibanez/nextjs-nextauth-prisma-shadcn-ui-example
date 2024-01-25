'use client'

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function SignOutButton() {

  const router = useRouter();

  const handleLogOut = async () => {
    await signOut({
      redirect: false,
    });

    router.replace('/login');
  }

  return (
    <Button
      type="button"
      onClick={handleLogOut}
      variant="outline"
    >
      Deslogar
    </Button>
  )
}