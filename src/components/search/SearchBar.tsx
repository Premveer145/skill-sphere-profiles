
import React, { useState } from "react";
import { SearchFilters } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { profileService } from "@/services/profileService";

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const loadSkills = async () => {
      setIsLoading(true);
      try {
        const allSkills = await profileService.getAllSkills();
        setSkills(allSkills);
      } catch (error) {
        console.error("Failed to load skills:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSkills();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters: SearchFilters = {};
    
    if (search) filters.search = search;
    if (selectedSkill) {
      const skill = skills.find(s => s.id === selectedSkill);
      if (skill) filters.skill = skill.name;
    }
    if (location) filters.location = location;
    
    onSearch(filters);
  };

  const handleClear = () => {
    setSearch("");
    setSelectedSkill("");
    setLocation("");
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, title, or skill..."
            className="pl-9"
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select
            value={selectedSkill}
            onValueChange={setSelectedSkill}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any skill</SelectItem>
              {skills.map((skill) => (
                <SelectItem key={skill.id} value={skill.id}>
                  {skill.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-48">
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button type="submit">Search</Button>
          <Button type="button" variant="outline" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
