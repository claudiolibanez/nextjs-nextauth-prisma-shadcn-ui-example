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

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "E-mail obrigatório" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(1, { message: "Senha obrigatória" })
    .min(6, { message: "Senha deve conter no mínimo 6 caracteres" }),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function SignInForm() {
  const form = useForm<LoginFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormData> = async ({
    email,
    password
  }) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.replace('/dashboard');
      }
    } catch (error) {
      console.log("login", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
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
            Login
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
            Não possui uma conta?
            {" "}
            <Link href="/register" className="text-slate-700 font-medium">
              Crie uma conta
            </Link>
          </span>
        </div>
      </form>
    </Form>
  )
}