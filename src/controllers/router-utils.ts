import express from 'express';
import { authenticate } from '../middleware/auth';
import { IVerifyOptions } from 'passport-local';
import { UserToken, Tweet } from '../models';

export function retrieveAndSendTweets(req: express.Request, res: express.Response, tweets: Tweet[]) {
    
    authenticate((err: Error, user: UserToken, info: IVerifyOptions) => {
        
        const filteredTweets = tweets.map(tweet => {

            let starredByMe = false;
            if (user) {
                const checkIfStarredByMe = tweet.starsByUserId.findIndex(o => o === user.id);
                starredByMe = checkIfStarredByMe >= 0 ? true : false;
            }

            const filteredTweet = {
                stars: tweet.starsByUserId.length,
                starredByMe: starredByMe,
                avatarUrl: tweet.avatarUrl,
                id: tweet.id,
                postDate: tweet.postDate,
                text: tweet.text,
                userId: tweet.userId,
                userHandle: tweet.userHandle,
            }

            return filteredTweet;
        })

        res.status(200).send(filteredTweets);
    })(req, res);
}
