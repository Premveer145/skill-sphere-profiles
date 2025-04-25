
import { Profile, SearchFilters, Skill } from "@/types";
import { mockProfiles, mockSkills } from "./mockData";
import { toast } from "sonner";

// Mock implementation of profile service
// This would be replaced with actual API calls in a production app

export const profileService = {
  getAllProfiles: async (): Promise<Profile[]> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockProfiles];
  },

  getProfileById: async (id: string): Promise<Profile | null> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const profile = mockProfiles.find(p => p.id === id);
    if (!profile) return null;
    
    return { ...profile };
  },

  getProfileByUserId: async (userId: string): Promise<Profile | null> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const profile = mockProfiles.find(p => p.userId === userId);
    if (!profile) return null;
    
    return { ...profile };
  },

  searchProfiles: async (filters: SearchFilters): Promise<Profile[]> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let results = [...mockProfiles];
    
    // Filter by skill if provided
    if (filters.skill) {
      results = results.filter(profile => 
        profile.skills.some(skill => 
          skill.name.toLowerCase() === filters.skill?.toLowerCase()
        )
      );
    }
    
    // Filter by location if provided
    if (filters.location) {
      results = results.filter(profile => 
        profile.location?.toLowerCase().includes(filters.location?.toLowerCase() || '')
      );
    }
    
    // Filter by general search term if provided
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      results = results.filter(profile => 
        profile.name.toLowerCase().includes(searchTerm) ||
        profile.title.toLowerCase().includes(searchTerm) ||
        profile.bio.toLowerCase().includes(searchTerm) ||
        profile.skills.some(skill => skill.name.toLowerCase().includes(searchTerm))
      );
    }
    
    return results;
  },

  createProfile: async (profileData: Partial<Profile>, userId: string): Promise<Profile> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newProfile: Profile = {
      id: `${mockProfiles.length + 1}`,
      userId,
      name: profileData.name || "",
      title: profileData.title || "",
      bio: profileData.bio || "",
      location: profileData.location,
      avatar: profileData.avatar,
      skills: profileData.skills || [],
      github: profileData.github,
      linkedin: profileData.linkedin,
      website: profileData.website,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // In a real app, we would store this in database
    mockProfiles.push(newProfile);
    
    toast.success("Profile created successfully!");
    return newProfile;
  },

  updateProfile: async (id: string, profileData: Partial<Profile>): Promise<Profile> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const profileIndex = mockProfiles.findIndex(p => p.id === id);
    if (profileIndex === -1) {
      throw new Error("Profile not found");
    }
    
    const updatedProfile = {
      ...mockProfiles[profileIndex],
      ...profileData,
      updatedAt: new Date().toISOString(),
    };
    
    // Update the mock data
    mockProfiles[profileIndex] = updatedProfile;
    
    toast.success("Profile updated successfully!");
    return updatedProfile;
  },

  getAllSkills: async (): Promise<Skill[]> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockSkills];
  },
};

export default profileService;
