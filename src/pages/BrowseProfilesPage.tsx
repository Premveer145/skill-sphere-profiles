
import React, { useState, useEffect } from "react";
import { profileService } from "@/services/profileService";
import { Profile } from "@/types";
import ProfileCard from "@/components/profile/ProfileCard";
import SearchBar from "@/components/search/SearchBar";

const BrowseProfilesPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfiles = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const fetchedProfiles = await profileService.getAllProfiles();
        setProfiles(fetchedProfiles);
      } catch (error) {
        console.error("Error loading profiles:", error);
        setError("Failed to load profiles");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfiles();
  }, []);

  const handleSearch = async (filters: any) => {
    setIsLoading(true);
    try {
      const results = await profileService.searchProfiles(filters);
      setProfiles(results);
      setError(null);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to perform search");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Profiles</h1>
      
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <p>Loading profiles...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-destructive">
          <p>{error}</p>
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-12">
          <p>No profiles found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseProfilesPage;
