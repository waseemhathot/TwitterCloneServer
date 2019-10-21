import express from 'express';
import { authenticate } from '../middleware/auth';
import { resolveStore } from '../middleware/store';
import uuid from 'uuid';
import { UserToken, Tweet } from '../models';
import tweetsValidationSchema from '../validators/tweets-validator';
import membersValidationSchema from '../validators/members-validator';
import { joiValidation } from '../middleware/joiValidation';
import { retrieveAndSendTweets } from './router-utils';


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


router.post('/', authenticate(), joiValidation(tweetsValidationSchema, (req: express.Request) => req.body),
 async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {

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

router.delete('/:id', authenticate(), joiValidation(membersValidationSchema, (req: express.Request) => req.params),
 async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  
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

router.post('/:id/star-toggle', authenticate(), joiValidation(membersValidationSchema, (req: express.Request) => req.params),
 async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   
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

export default router;