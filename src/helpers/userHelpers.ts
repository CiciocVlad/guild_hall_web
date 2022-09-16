import { User } from '../context';

export const isAdmin = (user: User) => user.is_admin;
