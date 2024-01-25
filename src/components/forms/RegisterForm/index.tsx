'use client'

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "@/components/buttons/GoogleSignInButton";
import Link from "next/link";

const registerFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nome é obrigatório" }),
  email: z
    .string()
    .min(1, { message: "E-mail obrigatório" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(1, { message: "Senha obrigatória" })
    .min(6, { message: "Senha deve conter no mínimo 6 caracteres" }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const form = useForm<RegisterFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormData> = async ({
    name,
    email,
    password,
  }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        router.push('/api/auth/signin');
      }
    } catch (error) {
      console.log("register", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  type="name"
                  placeholder="John Wick"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription /> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription /> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription /> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3">
          <Button type="submit">
            Cadastrar
          </Button>

          <div className="flex justify-center items-center gap-3">
            <div className="w-full h-px bg-zinc-700"></div>
            <span className="text-xs text-zinc-700 font-regular">OU</span>
            <div className="w-full h-px bg-zinc-700"></div>
          </div>

          <GoogleSignInButton />
        </div>

        <div className="flex justify-center items-center py-3">
          <span className="text-sm text-zinc-500">
            Já possuo uma conta?
            {" "}
            <Link href="/login" className="text-slate-700 font-medium">
              Faça Login
            </Link>
          </span>
        </div>
      </form>
    </Form>
  )
}