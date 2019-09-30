import { User } from "./user";

export interface Tweet {
    id: string;
    userID: string;
    date: string;
    stars: number;
    content: string;
}