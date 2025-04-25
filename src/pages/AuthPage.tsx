
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const AuthPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check URL for register parameter
    const params = new URLSearchParams(location.search);
    if (params.get("register") === "true") {
      setShowLogin(false);
    }
  }, [location]);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        {showLogin ? (
          <LoginForm
            onSuccess={handleSuccess}
            onRegisterClick={() => setShowLogin(false)}
          />
        ) : (
          <RegisterForm
            onSuccess={handleSuccess}
            onLoginClick={() => setShowLogin(true)}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
