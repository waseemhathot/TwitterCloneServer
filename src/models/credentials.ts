export enum UserRole {
   User = 'User',
   Guest = 'Guest',
   Admin = 'Admin',
}

export interface UserToken {
    userHandle: string
    roles: UserRole[];
    id: string;
    avatarUrl: string;
}

export interface UserCredential extends UserToken {
    email: string;
    password: string;
}