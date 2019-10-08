import { User } from "./user";

export interface Tweet {
    id: string;
    userId: string;
    date: string;
    stars: number;
    content: string;
}