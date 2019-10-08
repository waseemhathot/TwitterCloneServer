import express from 'express';
import store from '../store';

const router = express.Router();

router.get('/', (req, res) => res.send(store.tweets));

export default router;