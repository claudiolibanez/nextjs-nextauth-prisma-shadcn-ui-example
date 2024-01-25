'use client'

import { NextAuthSessionProvider } from "@/components/NextAuthSessionProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <NextAuthSessionProvider>
        {children}
      </NextAuthSessionProvider>
    </>
  );
}

export { Providers }