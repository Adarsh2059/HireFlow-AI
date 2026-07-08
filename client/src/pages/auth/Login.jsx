import { useForm } from "react-hook-form";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/authSchema";
import toast from "react-hot-toast";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async (formData) => {
  try {
    const response = await loginUser(formData);

    const user = response.data.user;

    login(user, response.data.token);

    toast.success(response.message);

    navigate("/");

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login Failed"
    );
  }
};

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>

          <p className="mt-2 text-slate-500">
            Login to continue to HireFlow-AI
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>

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
            <label className="block text-sm font-medium mb-2">Password</label>

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

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
