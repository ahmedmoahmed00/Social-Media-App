import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/Auth/hooks/auth/useUser";
import Loader from "../components/ui/Loader";

function PublicRoute({ children }) {
  const { isLoading, isAuthenticated, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isLoading &&
      isAuthenticated &&
      !(user?.recovery_sent_at && !user?.password_changed_at)
    ) {
      console.log("Valid user, redirecting to home");
      console.log("user", user);
      navigate("/");
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  if (isLoading) return <Loader />;

  return children;
}

export default PublicRoute;
