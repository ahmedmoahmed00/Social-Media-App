import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../components/ui/Loader";
import { useUser } from "../features/Auth/hooks/auth/useUser";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, user, isAuthenticated } = useUser();

  useEffect(() => {
    if (
      (!isAuthenticated && !isLoading) ||
      (user?.recovery_sent_at && !user?.password_changed_at)
    ) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  if (isLoading) return <Loader />;

  return children;
}

export default ProtectedRoute;
