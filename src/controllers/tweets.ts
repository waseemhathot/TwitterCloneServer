import express from 'express';
import { authenticate } from '../middleware/auth';
import { resolveStore } from '../middleware/store';
import uuid from 'uuid';
import { UserToken, Tweet } from '../models';



const router = express.Router();

router.get('/', async (req, res) => {

    const rootStore = resolveStore(res);
    const tweets: Tweet[] = await rootStore.tweets.all();

    res.send(tweets.sort((a, b) => {
        return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
    }));
});


router.post('/', authenticate(), (req, res) => {
    const rootStore = resolveStore(res);
    const user = req.user as UserToken;
    if(user){
        rootStore.tweets.addOne({
            id: uuid(),
            userId: user.id,
            postDate: Date(),
            stars: 0,
            text: req.body.text,
            avatarUrl: user.avatarUrl,
            userHandle: user.userHandle,
        })
    }
    

    res.sendStatus(200);
});
export default router;