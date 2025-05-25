import type { Timestamp as FirestoreTimestamp } from 'firebase/firestore';

export interface Course {
  id?: string;
  name?: string;
  description?: string;
  category?: {
    id?: number;
    name?: string;
    description?: string;
  };
  owner?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    id?: number;
  };
  roles?: Array<{
    admin?: string;
    editor?: string;
  }>;
  fileURL?: string;
  createdAt?: FirestoreTimestamp;
}
