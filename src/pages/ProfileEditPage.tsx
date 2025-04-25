
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { profileService } from "@/services/profileService";
import { Profile } from "@/types";
import ProfileForm from "@/components/profile/ProfileForm";

const ProfileEditPage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated || !user) {
      navigate("/auth");
      return;
    }

    const loadProfile = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const fetchedProfile = await profileService.getProfileByUserId(user.id);
        setProfile(fetchedProfile);
      } catch (error) {
        console.error("Error loading profile:", error);
        setError("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, user, navigate]);

  const handleProfileUpdate = (updatedProfile: Profile) => {
    navigate("/profile");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center py-12">
          <p>Loading profile...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-destructive mb-4">{error}</h2>
          <button
            onClick={() => navigate("/profile")}
            className="text-primary hover:underline"
          >
            Back to Profile
          </button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <ProfileForm
            existingProfile={profile || undefined}
            onSuccess={handleProfileUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileEditPage;
