import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Register</h1>
      <RegisterForm />
    </div>
  )
}
