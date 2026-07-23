import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = () => {
  const { isAuthenticated, loading, hydrate } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    hydrate();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
