'use client'

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

export function GoogleSignInButton() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const result = await signIn('google', {
        redirect: false,
      });

      if (result?.ok) {
        router.replace('/dashboard');
      }
    } catch (error) {
      console.log("google signin", error);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleSignIn}
      variant="outline"
    >
      <GoogleIcon />
      Login with Google
    </Button>
  )
}