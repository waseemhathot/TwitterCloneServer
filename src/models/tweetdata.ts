import { Tweet } from "./tweet";
import { User } from "./user";

export interface TweetData {
    tweet: Tweet;
    author: User;
}