
import React from "react";
import { Profile } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface ProfileDetailProps {
  profile: Profile;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ profile }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isOwner = isAuthenticated && user?.id === profile.userId;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar || `https://i.pravatar.cc/100?u=${profile.name}`} alt={profile.name} />
                <AvatarFallback>{profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-lg text-muted-foreground">{profile.title}</p>
                {profile.location && (
                  <p className="text-sm text-muted-foreground mt-1">{profile.location}</p>
                )}
              </div>
            </div>
            
            {isOwner && (
              <Button onClick={() => navigate("/profile/edit")}>
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">{profile.bio}</p>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <div key={skill.id} className="skill-badge">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
          
          {(profile.github || profile.linkedin || profile.website) && (
            <>
              <Separator />
              
              <div>
                <h2 className="text-lg font-semibold mb-2">Connect</h2>
                <div className="flex flex-wrap gap-3">
                  {profile.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={profile.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </Button>
                  )}
                  
                  {profile.linkedin && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  
                  {profile.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={profile.website} target="_blank" rel="noopener noreferrer">
                        Personal Website
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetail;
