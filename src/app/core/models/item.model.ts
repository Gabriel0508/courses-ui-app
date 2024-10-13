export interface Item {
  id: number;
  name: string;
  description: string;
  isEnable: boolean;
  type: string;
  owner: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: [
      {
        name: string;
      }
    ];
  };
  image: null;
}
