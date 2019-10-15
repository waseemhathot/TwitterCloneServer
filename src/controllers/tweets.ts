import express from 'express';
import { authenticate } from '../middleware/auth';
import { resolveStore } from '../middleware/store';
import uuid from 'uuid';
import { UserToken, Tweet } from '../models';


const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response): Promise<void> => {

    const rootStore = resolveStore(res);
    const tweets: Tweet[] = await rootStore.tweets.all();
    res.send(tweets);
});


router.post('/', authenticate(), async (req: express.Request, res: express.Response): Promise<void> => {

    const rootStore = resolveStore(res);
    const user = req.user as UserToken;
    if (user) {
        await rootStore.tweets.addOne({
            id: uuid(),
            userId: user.id,
            postDate: Date(),
            stars: 0,
            text: req.body.text,
            avatarUrl: user.avatarUrl,
            userHandle: user.userHandle,
        })
        res.sendStatus(200);
    }
    res.sendStatus(400);

});

router.delete('/:id', authenticate(), async (req: express.Request, res: express.Response): Promise<void> => {

    const rootStore = resolveStore(res);
    const tweetId = req.params.id;
    const user = req.user as UserToken;

    const tweet = await rootStore.tweets.findById(tweetId);
    if (tweet) {
        if (tweet.userId === user.id) {
            rootStore.tweets.deleteById(tweet.id);
            res.sendStatus(204);
        }
        res.sendStatus(403);
    }
    res.sendStatus(204);
});

router.post('/:id/star-toggle', authenticate(), async (req: express.Request, res: express.Response) => {

    
});

export default router;