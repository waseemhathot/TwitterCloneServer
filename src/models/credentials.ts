export enum UserRole {
   User = 'User',
   Guest = 'Guest',
   Admin = 'Admin',
}

export interface UserToken {
    email: string;
    roles: UserRole[];
}

export interface Credential extends UserToken {
    password: string;
}

export interface UserCredential extends Credential {
    userId: string;
}
