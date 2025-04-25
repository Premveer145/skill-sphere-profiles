
import { User } from "@/types";
import { mockUsers } from "./mockData";
import { toast } from "sonner";

// Mock implementation of authentication service
// This would be replaced with actual API calls in a production app

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

// Simulate backend validation
const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const authService = {
  register: async (username: string, email: string, password: string): Promise<User> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!validateEmail(email)) {
      throw new Error("Invalid email format");
    }

    if (!validatePassword(password)) {
      throw new Error("Password must be at least 6 characters");
    }

    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === email || user.username === username);
    if (existingUser) {
      throw new Error("Username or email already in use");
    }

    // Create new user
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      username,
      email,
      token: `mock-jwt-token-${Date.now()}`,
    };

    // In a real app, we would store this in database
    mockUsers.push(newUser);

    // Save auth state to localStorage
    localStorage.setItem(TOKEN_KEY, newUser.token as string);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));

    toast.success("Registration successful!");
    return newUser;
  },

  login: async (email: string, password: string): Promise<User> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // In a real app, we would validate credentials against the database
    const user = mockUsers.find(user => user.email === email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Mock token creation
    user.token = `mock-jwt-token-${Date.now()}`;

    // Save auth state to localStorage
    localStorage.setItem(TOKEN_KEY, user.token as string);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    toast.success("Login successful!");
    return user;
  },

  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    toast.success("Logged out successfully");
  },

  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

export default authService;
