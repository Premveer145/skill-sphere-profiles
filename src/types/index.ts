
export interface User {
  id: string;
  username: string;
  email: string;
  token?: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  title: string;
  bio: string;
  location?: string;
  avatar?: string;
  skills: Skill[];
  github?: string;
  linkedin?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SearchFilters {
  skill?: string;
  location?: string;
  search?: string;
}
