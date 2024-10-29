// user.model.ts
export interface User {
  email: string;
  password: string;
  userId?: string;
  role: 'owner' | 'tenant'; 
}
