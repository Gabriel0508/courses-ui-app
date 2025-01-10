export interface Item {
  id: number;
  name: string;
  description: string;
  isEnabled: boolean;
  type: string;
  owner: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: { name: string }[];
  };
  image: string;
}
