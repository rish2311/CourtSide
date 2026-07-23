import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { forgotPassword } from "../services/auth";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
      toast.success("If that email exists, a reset link has been sent");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
            {sent ? "Check your email" : "Forgot password?"}
          </h1>
          <p className="text-on-surface-variant">
            {sent
              ? "We've sent a password reset link if that account exists."
              : "Enter your email and we'll send you a reset link."}
          </p>
        </div>

        <div className="bg-surface-bright/80 backdrop-blur-xl rounded-2xl border border-outline-variant/10 shadow-2xl p-8">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-on-surface-variant">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-sm text-primary font-medium hover:underline"
              >
                Try a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-on-surface">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                {loading ? "Sending..." : "Send Reset Link"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
