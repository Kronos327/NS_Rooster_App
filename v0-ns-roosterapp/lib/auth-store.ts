/**
 * In-memory authentication store
 * TODO: Replace with a real database (e.g., Supabase, PostgreSQL, MongoDB) for production
 */

export interface User {
  id: string;
  email: string;
  password: string; // TODO: In production, use proper password hashing (bcrypt)
  createdAt: Date;
}

export interface RoosterSettings {
  userId: string;
  standplaats: string;
  functiegroep: "MCN" | "HC" | "OVERIG";
  rooster: string;
  startregel: number;
  jaar: number;
}

// In-memory stores
// TODO: Replace with database queries
const users: User[] = [];
const roosterSettings: Map<string, RoosterSettings> = new Map();

// Generate a simple ID
// TODO: Use proper UUID generation or database-generated IDs
function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// User management functions
export function registerUser(email: string, password: string): User | null {
  // Check if user already exists
  const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return null;
  }

  // TODO: Hash password with bcrypt before storing
  const newUser: User = {
    id: generateId(),
    email: email.toLowerCase(),
    password: password, // TODO: Store hashed password
    createdAt: new Date(),
  };

  users.push(newUser);
  return newUser;
}

export function loginUser(email: string, password: string): User | null {
  // TODO: Compare with hashed password using bcrypt.compare()
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return user || null;
}

export function getUserById(id: string): User | null {
  return users.find((u) => u.id === id) || null;
}

// Rooster settings functions
export function saveRoosterSettings(settings: RoosterSettings): void {
  // TODO: Save to database
  roosterSettings.set(settings.userId, settings);
}

export function getRoosterSettings(userId: string): RoosterSettings | null {
  // TODO: Fetch from database
  return roosterSettings.get(userId) || null;
}

// Export for debugging (remove in production)
export function getAllUsers(): User[] {
  return users;
}
