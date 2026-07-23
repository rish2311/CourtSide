import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import { loginSchema, type LoginFormData } from "../lib/authSchemas";
import { loginUser } from "../services/auth";
import useAuthStore from "../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);
      login(response.data.user, response.data.accessToken, response.data.refreshToken);
      toast.success("Login successful");
      navigate("/");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/hero_bg_court.jpeg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/60" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-[420px] mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-on-surface font-bold text-xl mb-6"
          >
            CourtSide
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-2">
            Welcome back
          </h1>
          <p className="text-on-surface-variant">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-surface-bright/80 backdrop-blur-xl rounded-2xl border border-outline-variant/10 shadow-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-on-surface"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" />
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-on-surface"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-on-surface transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              {isSubmitting ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-outline-variant/10 text-center">
            <p className="text-sm text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
