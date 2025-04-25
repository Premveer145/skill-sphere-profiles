
import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md animate-fade-in">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={profile.avatar || `https://i.pravatar.cc/100?u=${profile.name}`} alt={profile.name} />
            <AvatarFallback>{profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">{profile.title}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mt-4 line-clamp-3">{profile.bio}</p>
        <div className="mt-4 flex flex-wrap gap-1">
          {profile.skills.slice(0, 3).map((skill) => (
            <div key={skill.id} className="skill-badge">
              {skill.name}
            </div>
          ))}
          {profile.skills.length > 3 && (
            <div className="skill-badge">+{profile.skills.length - 3}</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full">
          <Link to={`/profile/${profile.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
