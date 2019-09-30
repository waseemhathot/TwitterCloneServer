import {UserCredential, UserRole } from '../models';

interface StoreType {
  projects: Project[];
  users: User[];
  credentials: UserCredential[];
}

const store: StoreType = {
  projects: [
    { id: 1, name: 'CVPark' },
    { id: 2, name: 'CodeResource' },
  ],
  users: [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ],
  credentials: [
    { email: 'a', password: 'a', userId: 1, roles: [UserRole.Reader] },
    { email: 'b', password: 'b', userId: 2, roles: [UserRole.Contributor] },
    { email: 'c', password: 'c', userId: 3, roles: [UserRole.Admin] },
  ],
};

export default store;
