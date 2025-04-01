export interface Course {
  id?: string;     
  name?: string;
  description?: string;
  owner?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    id?: number;
  };
  roles?: Array<{
    name?: string;
  }>;
}
