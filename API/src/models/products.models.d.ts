import { User } from './users.models';

export interface Product {
  id?: number;
  name: string;
  price: number;
  UserID?: User['id'];
}
