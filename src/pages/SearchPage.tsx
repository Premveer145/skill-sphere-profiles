import React, { useState } from "react";
import { profileService } from "@/services/profileService";
import { Profile, SearchFilters } from "@/types";
import ProfileCard from "@/components/profile/ProfileCard";
import SearchBar from "@/components/search/SearchBar";
import { Search } from "lucide-react";

const SearchPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if the filters are empty (no search criteria)
      const hasFilters = Object.values(filters).some(value => value !== undefined && value !== "");
      
      if (!hasFilters) {
        // If no search criteria, just fetch all profiles
        const allProfiles = await profileService.getAllProfiles();
        setProfiles(allProfiles);
      } else {
        // Otherwise, search with the provided filters
        const results = await profileService.searchProfiles(filters);
        setProfiles(results);
      }
      
      setHasSearched(true);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to perform search");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Profiles</h1>
      
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {!hasSearched && !isLoading ? (
        <div className="text-center py-12">
          <div className="mb-4 flex justify-center">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Search for Technical Talent</h2>
          <p className="text-muted-foreground">
            Use the search bar above to find profiles by skill, location, or keyword.
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center py-12">
          <p>Searching profiles...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-destructive">
          <p>{error}</p>
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-12">
          <p>No profiles found matching your search criteria.</p>
        </div>
      ) : (
        <div>
          <p className="text-muted-foreground mb-4">Found {profiles.length} profile(s)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
