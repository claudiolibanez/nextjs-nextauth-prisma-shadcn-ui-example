import { SignInForm } from "@/components/forms/SignInForm";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col w-[440px] gap-y-4 bg-gray-100 p-6 rounded-md">
        <SignInForm />
      </div>
    </>
  );
}
