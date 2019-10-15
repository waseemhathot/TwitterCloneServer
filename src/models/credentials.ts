
export interface UserToken {
    id: string;
    userHandle: string
    avatarUrl: string;
    email: string;
    registrationDate: string;
    lastLoginDate: string;
}

export interface UserCredential {
    id: string;
    email: string;
    password: string;
}