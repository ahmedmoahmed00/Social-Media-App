import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../components/ui/Loader";
import { useUser } from "../features/Auth/hooks/auth/useUser";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading) return <Loader />;

  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
