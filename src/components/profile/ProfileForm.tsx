
import React, { useState, useEffect } from "react";
import { Profile, Skill } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { profileService } from "@/services/profileService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ProfileFormProps {
  existingProfile?: Profile;
  onSuccess?: (profile: Profile) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ existingProfile, onSuccess }) => {
  const [name, setName] = useState(existingProfile?.name || "");
  const [title, setTitle] = useState(existingProfile?.title || "");
  const [bio, setBio] = useState(existingProfile?.bio || "");
  const [location, setLocation] = useState(existingProfile?.location || "");
  const [github, setGithub] = useState(existingProfile?.github || "");
  const [linkedin, setLinkedin] = useState(existingProfile?.linkedin || "");
  const [website, setWebsite] = useState(existingProfile?.website || "");
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>(existingProfile?.skills || []);
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const skills = await profileService.getAllSkills();
        setAvailableSkills(skills.filter(skill => 
          !selectedSkills.some(selected => selected.id === skill.id)
        ));
      } catch (error) {
        console.error("Failed to load skills:", error);
        toast({
          title: "Error",
          description: "Failed to load skills",
          variant: "destructive",
        });
      }
    };
    
    loadSkills();
  }, [selectedSkills, toast]);

  const handleAddSkill = (skillId: string) => {
    const skill = availableSkills.find(s => s.id === skillId);
    if (skill) {
      setSelectedSkills([...selectedSkills, skill]);
      setAvailableSkills(availableSkills.filter(s => s.id !== skillId));
    }
  };

  const handleRemoveSkill = (skillId: string) => {
    const skill = selectedSkills.find(s => s.id === skillId);
    if (skill) {
      setSelectedSkills(selectedSkills.filter(s => s.id !== skillId));
      setAvailableSkills([...availableSkills, skill].sort((a, b) => 
        parseInt(a.id) - parseInt(b.id)
      ));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create or update a profile",
        variant: "destructive",
      });
      return;
    }

    if (!name || !title || !bio) {
      toast({
        title: "Error",
        description: "Name, Title, and Bio are required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    const profileData = {
      name,
      title,
      bio,
      location,
      github,
      linkedin,
      website,
      skills: selectedSkills,
    };

    try {
      let result;
      
      if (existingProfile) {
        result = await profileService.updateProfile(existingProfile.id, profileData);
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      } else {
        result = await profileService.createProfile(profileData, user.id);
        toast({
          title: "Success",
          description: "Profile created successfully",
        });
      }

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save profile",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">
          {existingProfile ? "Edit Your Profile" : "Create Your Profile"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Full Stack Developer"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Country"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input
                  id="github"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/yourusername"
                  type="url"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/yourusername"
                  type="url"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Personal Website</Label>
                <Input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  type="url"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about your background and expertise..."
                rows={5}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedSkills.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No skills selected</p>
                ) : (
                  selectedSkills.map((skill) => (
                    <Badge key={skill.id} variant="secondary" className="px-3 py-1 text-sm">
                      {skill.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="ml-2 hover:text-destructive focus:outline-none"
                        aria-label={`Remove ${skill.name} skill`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
              
              <Select
                onValueChange={handleAddSkill}
                disabled={availableSkills.length === 0 || isSubmitting}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Add a skill" />
                </SelectTrigger>
                <SelectContent>
                  {availableSkills.map((skill) => (
                    <SelectItem key={skill.id} value={skill.id}>
                      {skill.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? existingProfile ? "Updating..." : "Creating..."
              : existingProfile ? "Update Profile" : "Create Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
