import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import { registerSchema } from "../../validation/authSchema";
import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const { confirmPassword, ...userData } = formData;

      const response = await registerUser(userData);

      login(
        response.data.user,
        response.data.token
      );

      toast.success(response.message);

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="mt-2 text-slate-500">
            Join HireFlow-AI
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <Input
              placeholder="Enter your name"
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <Input
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Creating Account..."
              : "Create Account"}
          </Button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;