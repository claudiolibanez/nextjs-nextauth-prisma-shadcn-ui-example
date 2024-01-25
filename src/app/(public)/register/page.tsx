import { RegisterForm } from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <div className="flex flex-col w-[440px] gap-y-4 bg-gray-100 p-6 rounded-md">
        <RegisterForm />
      </div>
    </>
  );
}
