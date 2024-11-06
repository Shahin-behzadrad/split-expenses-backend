export type CreateGroupRequest = {
  name: string;
  description: string | null;
  currency: string;
  users: string[];
};
