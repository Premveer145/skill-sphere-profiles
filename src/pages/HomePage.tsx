
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profileService } from "@/services/profileService";
import { Profile } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import ProfileCard from "@/components/profile/ProfileCard";
import { Search } from "lucide-react";

const HomePage: React.FC = () => {
  const [featuredProfiles, setFeaturedProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfiles = async () => {
      setIsLoading(true);
      try {
        const profiles = await profileService.getAllProfiles();
        setFeaturedProfiles(profiles.slice(0, 3));
      } catch (error) {
        console.error("Error loading profiles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfiles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-accent/80 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Showcase Your Technical Skills
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 animate-fade-in">
            Create a professional profile to highlight your expertise and connect with others in the tech community.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in">
            {isAuthenticated ? (
              <Button
                size="lg"
                onClick={() => navigate("/profile")}
                className="bg-white text-primary hover:bg-white/90"
              >
                Manage Profile
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={() => navigate("/auth?register=true")}
                className="bg-white text-primary hover:bg-white/90"
              >
                Join Skill Sphere
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/browse")}
              className="border-white text-white hover:bg-white/20"
            >
              Browse Profiles
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Skill Sphere?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Build a professional profile to showcase your skills and experience.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Highlight Your Skills</h3>
              <p className="text-muted-foreground">
                Tag your profile with skills to help others find your expertise.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Discover</h3>
              <p className="text-muted-foreground">
                Search profiles by skills, location, and more to find potential collaborators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Profiles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Profiles</h2>
            <Link to="/browse" className="text-primary hover:underline">
              View All
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>Loading profiles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Looking for specific skills?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Use our powerful search feature to find professionals with the exact skills you need.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/search")}
            className="flex items-center gap-2"
          >
            <Search className="h-5 w-5" />
            Search Profiles
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
