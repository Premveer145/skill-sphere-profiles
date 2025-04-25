
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { profileService } from "@/services/profileService";
import { Profile } from "@/types";
import ProfileDetail from "@/components/profile/ProfileDetail";
import ProfileForm from "@/components/profile/ProfileForm";
import { Button } from "@/components/ui/button";

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let fetchedProfile: Profile | null = null;
        
        // If there's an ID in the URL, fetch that specific profile
        if (id) {
          fetchedProfile = await profileService.getProfileById(id);
        } 
        // If we're on the current user's profile page
        else if (isAuthenticated && user) {
          fetchedProfile = await profileService.getProfileByUserId(user.id);
          
          // If the logged-in user doesn't have a profile yet
          if (!fetchedProfile) {
            navigate("/profile/create");
            return;
          }
        }
        
        if (fetchedProfile) {
          setProfile(fetchedProfile);
        } else {
          setError("Profile not found");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setError("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [id, isAuthenticated, user, navigate]);

  // If not authenticated and trying to access own profile
  if (!isAuthenticated && !id) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center py-12">
          <p>Loading profile...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-destructive mb-4">{error}</h2>
          <Button onClick={() => navigate("/browse")}>Browse Profiles</Button>
        </div>
      ) : profile ? (
        <ProfileDetail profile={profile} />
      ) : null}
    </div>
  );
};

export default ProfilePage;
