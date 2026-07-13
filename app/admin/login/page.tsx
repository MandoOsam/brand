import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <div className="container-px mx-auto flex min-h-[70vh] max-w-md flex-col justify-center py-16">
      <h1 className="mb-6 text-center font-display text-2xl font-semibold">AEON Admin</h1>
      <LoginForm />
    </div>
  );
}
