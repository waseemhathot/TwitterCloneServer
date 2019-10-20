import express from 'express';
import { authenticate } from '../middleware/auth';
import { resolveStore } from '../middleware/store';
import uuid from 'uuid';
import { UserToken, Tweet } from '../models';
import { IVerifyOptions } from 'passport-local';
import joi from 'joi';
import tweetsValidationSchema from '../validators/tweets-validator'
import membersValidationSchema from '../validators/members-validator'

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {

    try {
        const rootStore = resolveStore(res);
        const tweets: Tweet[] = await rootStore.tweets.all();

        retrieveAndSendTweets(req, res, tweets);
    }
    catch {
        res.sendStatus(404);
    }
});


router.post('/', authenticate(), async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {

    const {error, value: v} = joi.validate(req.body, tweetsValidationSchema);
    if (error) {
        next(error);
        return;
    };

    const rootStore = resolveStore(res);
    const user = req.user as UserToken;

    if (user) {

        const currDate = Date();
        const newTweetId = uuid();
        const tweetInfo: any = {
            id: newTweetId,
            userId: user.id,
            postDate: currDate,
            text: req.body.text,
            avatarUrl: user.avatarUrl,
            userHandle: user.userHandle,
        }

        await rootStore.tweets.addOne(Object.assign(tweetInfo, { starsByUserId: [] }));
        res.status(200).send(Object.assign(tweetInfo, { stars: 0 }));

    }
    else {
        res.sendStatus(400);
    }
});

router.delete('/:id', authenticate(), async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    
    const {error, value: v} = joi.validate(req.params, membersValidationSchema);
    if (error) {
        next(error);
        return;
    };
  
    try {
        const rootStore = resolveStore(res);
        const tweetId = req.params.id;
        const user = req.user as UserToken;
        const tweet = await rootStore.tweets.findById(tweetId);

        if (tweet) {
    
            if (tweet.userId === user.id) {
    
                rootStore.tweets.deleteById(tweet.id);
                res.sendStatus(204);
            }
            else{
                res.sendStatus(403);
            }
        }
    }
    catch {
        res.sendStatus(204);
    }

});

router.post('/:id/star-toggle', authenticate(), async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const {error, value: v} = joi.validate(req.params, membersValidationSchema);
    if (error) {
        next(error);
        return;
    };

    try {
        const rootStore = resolveStore(res);
        const tweetId = req.params.id;
        const user = req.user as UserToken;
    
        const tweet: Tweet = await rootStore.tweets.toggleStarsByUserId(tweetId, user.id);
        const stars: number = tweet.starsByUserId.length;
        const checkIfStarredByMe = tweet.starsByUserId.findIndex(o => o === user.id);
        const starredByMe = checkIfStarredByMe >= 0 ? true : false;

        res.status(200).send({
            stars: stars,
            starredByMe: starredByMe,
        });
    }
    catch (err) {
        res.sendStatus(err);
    }
});

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

export default router;