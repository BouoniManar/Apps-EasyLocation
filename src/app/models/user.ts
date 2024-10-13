// user.model.ts
export interface User {
  email: string;
  password: string; // Note: Avoid storing passwords in plain text
  userId?: string; // Optional if you want to store the Firebase UID
  role: 'owner' | 'tenant'; // Specify possible roles
}
