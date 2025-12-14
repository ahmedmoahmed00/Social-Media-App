import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../features/Auth/hooks/auth/useUser";

const ProtectedResetPassword = ({ children }) => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const checkToken = () => {
      const hasValidResetToken =
        user?.recovery_sent_at && !user?.password_changed_at;

      if (hasValidResetToken) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };

    checkToken();
  }, [user, navigate]);

  if (isValid === null) return <div>Loading...</div>;
  if (isValid === false)
    return (
      <div className="container mx-auto text-center flex flex-col items-center space-y-5 h-screen justify-center">
        <h1>Link is invalid or expired</h1>
        <p>Please request a new password reset link.</p>
        <Link className="text-blue-500 hover:underline" to="/forgot-password">
          Request New Link
        </Link>
      </div>
    );

  return <>{children}</>;
};

export default ProtectedResetPassword;
