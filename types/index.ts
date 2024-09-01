export type RoleType = "pro" | "business";

export interface Project {
  id: string;
  name: string;
  slug: string;
  userId: string;
  createdAt: number;
}
