
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ProfileForm from "@/components/profile/ProfileForm";
import { Profile } from "@/types";

const ProfileCreatePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated || !user) {
      navigate("/auth");
    }
  }, [isAuthenticated, user, navigate]);

  const handleProfileCreate = (profile: Profile) => {
    navigate("/profile");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create Your Profile</h1>
        <ProfileForm onSuccess={handleProfileCreate} />
      </div>
    </div>
  );
};

export default ProfileCreatePage;
